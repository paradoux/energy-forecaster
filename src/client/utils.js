import axios from "axios"

export const dataFetcher = url => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url
    })
      .then(response => resolve(response))
      .catch(err => {
        const error = new Error()
        error.message = "Error when retrieving data from the API"
        error.status = 500
        reject(error)
      })
  })
}
