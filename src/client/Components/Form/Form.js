// Modules imports
import React, {useState, useEffect} from "react"

// Style import
import "./Form.scss"

const Form = props => {
  const [pannelArea, setPannelArea] = useState("")
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [incorrectPannelAreaInput, setIncorrectPannelAreaInput] = useState(true)
  const [incorrectLatitudeInput, setIncorrectLatitudeInput] = useState(true)
  const [incorrectLongitudeInput, setIncorrectLongitudeInput] = useState(true)

  const handleClick = e => {
    e.preventDefault()
    if (
      !incorrectPannelAreaInput &&
      !incorrectLatitudeInput &&
      !incorrectLongitudeInput
    ) {
      props.fetchEnergyEstimation(latitude, longitude, parseInt(pannelArea, 10))
    }
  }

  const validatePannelAreaInput = () => {
    pannelArea === "" || /\D/.test(pannelArea)
      ? setIncorrectPannelAreaInput(true)
      : setIncorrectPannelAreaInput(false)
  }

  const validateLatitudeInput = () => {
    !latitude || !/^([-+]?)([\d]{1,2})(((\.)(\d+)))$/.test(latitude)
      ? setIncorrectLatitudeInput(true)
      : setIncorrectLatitudeInput(false)
  }

  const validateLongitudeInput = () => {
    !longitude || !/^(([-+]?)([\d]{1,3})((\.)(\d+))?)$/.test(longitude)
      ? setIncorrectLongitudeInput(true)
      : setIncorrectLongitudeInput(false)
  }

  const displayTextSubmitButton = () => {
    if (
      incorrectPannelAreaInput ||
      incorrectLatitudeInput ||
      incorrectLongitudeInput
    ) {
      return "Please, fill all fields correctly"
    } else {
      return "Submit !"
    }
  }

  useEffect(() => {
    validatePannelAreaInput()
    validateLatitudeInput()
    validateLongitudeInput()
  })

  return (
    <>
      <form className="form" action="">
        <div>
          <label htmlFor="latitude">The latitude of your house</label>
          <input
            className={!incorrectLatitudeInput ? "latitude" : "latitude error"}
            data-testid="latitude-input"
            type="text"
            name="latitude"
            value={latitude}
            placeholder="49.2489"
            onChange={e => setLatitude(e.target.value)}
            onFocus={e => (e.target.placeholder = "")}
            onBlur={e => (e.target.placeholder = "49.2489")}
            required
          />
        </div>
        <div>
          <label htmlFor="longitude">The longitude of your house</label>
          <input
            className={
              !incorrectLongitudeInput ? "longitude" : "longitude error"
            }
            data-testid="longitude-input"
            type="text"
            name="longitude"
            value={longitude}
            placeholder="5.95068"
            onChange={e => setLongitude(e.target.value)}
            onFocus={e => (e.target.placeholder = "")}
            onBlur={e => (e.target.placeholder = "5.95068")}
            required
          />
        </div>
        <div>
          <label htmlFor="pannelArea">
            Your available space in square meters
          </label>
          <input
            className={
              !incorrectPannelAreaInput ? "pannel-area" : "pannel-area error"
            }
            data-testid="pannel-area-input"
            type="text"
            name="pannelArea"
            value={pannelArea}
            onChange={e => setPannelArea(e.target.value)}
            placeholder="35"
            onFocus={e => (e.target.placeholder = "")}
            onBlur={e => (e.target.placeholder = "35")}
            required
          />
        </div>
        <input
          className="submit"
          type="submit"
          name="submit"
          data-testid="submit-input"
          onClick={e => handleClick(e)}
          value={displayTextSubmitButton()}
        />
      </form>
    </>
  )
}

export default Form
