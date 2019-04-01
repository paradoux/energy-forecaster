// Modules imports
import React from "react"
import "babel-polyfill"
import {render, fireEvent, cleanup} from "react-testing-library"

// App imports
import Form from "../Components/Form/Form"

afterEach(cleanup)

const mockApiCall = jest.fn(() => Promise.resolve({totalYearlyEnergy: 3295.8}))
const form = render(<Form energyComputer={mockApiCall} />)
const latitudeInput = form.getByTestId("latitude-input")
const longitudeInput = form.getByTestId("longitude-input")
const pannelAreaInput = form.getByTestId("pannel-area-input")
const submitInput = form.getByTestId("submit-input")

describe("Form component Error handling", () => {
  const inputErrorHandlingTest = inputArea => {
    test("It should display an error status when empty", () => {
      fireEvent.change(inputArea, {target: {value: ""}})
      expect(submitInput.value).toBe("Please, fill all fields correctly")
    })

    test("It should display an error status when incorrect value", () => {
      fireEvent.change(inputArea, {target: {value: "Not a correct value"}})
      expect(submitInput.value).toBe("Please, fill all fields correctly")
    })
  }
  // Test Latitude input error handling
  describe("Latitude input", () => {
    inputErrorHandlingTest(latitudeInput)
  })

  // Test Longitude input error handling
  describe("Longitude input", () => {
    inputErrorHandlingTest(longitudeInput)
  })

  // Test Pannel Area input error handling
  describe("Pannel Area input", () => {
    inputErrorHandlingTest(pannelAreaInput)
  })
})
