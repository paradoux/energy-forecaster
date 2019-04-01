// Modules imports
import React, {useState} from "react"

// Components imports
import Form from "../Form/Form"
import ResultDisplayer from "../ResultDisplayer/ResultDisplayer"
import ErrorDisplayer from "../ErrorDisplayer/ErrorDisplayer"

// App imports
import {dataFetcher} from "../../utils"

// Style import
import "./App.scss"

const App = () => {
  const [totalEnergyYearly, setTotalEnergyYearly] = useState("")
  const [errorFromApi, setErrorFromApi] = useState("")

  const fetchEnergyEstimation = async (lat, lng, pannelArea) => {
    try {
      const url = `/api/pgis-data?lat=${lat}&lng=${lng}&pannelArea=${pannelArea}`
      const results = await dataFetcher(url)
      setTotalEnergyYearly(results.data.totalYearlyEnergy)
    } catch (error) {
      setErrorFromApi(error)
    }
  }

  return (
    <div className="App">
      <Form energyComputer={fetchEnergyEstimation} />
      {totalEnergyYearly && (
        <ResultDisplayer
          data-testid="result-displayer"
          totalEnergyYearly={totalEnergyYearly}
        />
      )}
      {errorFromApi && <ErrorDisplayer errorFromApi={errorFromApi} />}
    </div>
  )
}

export default App
