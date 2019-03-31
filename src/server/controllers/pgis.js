// Modules imports
import axios from "axios"

const pgisReadOne = async (req, res, next) => {
  try {
    const {lat, lng, pannelArea} = req.query
    // Use the functions below to handle request and send back the total yearly energy produced
    const apiResults = await dataFetcher(
      pgisUrlDeterminer(lat, lng, pannelArea)
    )
    const totalYearlyEnergy = PGISResultsExtractor(apiResults.data)
    res.status = 200
    res.json({totalYearlyEnergy})
  } catch (error) {
    next(error)
  }
}

// Fetch data from API wanted and resolve/reject result/error
const dataFetcher = url => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url
    })
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        const error = new Error()
        error.message = "Error when retrieving data from the API"
        error.status = 500
        reject(error)
      })
  })
}

// Determine the correct PGIS API URL based on given input
const pgisUrlDeterminer = (lat, lng, pannelArea) => {
  let kWh
  pannelArea <= 8 ? (kWh = 1) : (kWh = Math.round(pannelArea / 8))

  return `http://re.jrc.ec.europa.eu/pvgis5/PVcalc.php?lat=${lat}&lon=${lng}&peakpower=${kWh}&loss=14`
}

// Extract data table from text result of PGIS API
const tableExtractor = content => {
  return content.match(new RegExp("SDm([\\s\\S]*?)Year", "g"))[0]
}

// Divide data table into  array of values
const tableDivider = table => {
  return table.match(new RegExp("[\\d\\.]+", "g"))
}

// Select the average monthly energy production column
const columnSelector = table => {
  const array = []
  for (var i = 2; i < table.length; i += 6) {
    array.push(table[i])
  }
  return array
}

// Sum to months values to get the Average yearly production
const cellSum = cells => {
  return cells.reduce((sum, curval) => {
    return (sum += parseFloat(curval, 10))
  }, 0)
}

// Compose the different functions above
const PGISResultsExtractor = content => {
  return cellSum(columnSelector(tableDivider(tableExtractor(content))))
}

export default pgisReadOne
