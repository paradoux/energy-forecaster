// Modules imports
import React from "react"
import "babel-polyfill"
import {render, fireEvent, cleanup} from "react-testing-library"

// App imports
import Form from "../Components/Form/Form"

afterEach(cleanup)

// Renders the Form component and returns the input area wanted with the Submit Input
const renderFormComponent = inputAreaTestId => {
  const form = render(<Form />)
  const inputArea = form.getByTestId(inputAreaTestId)
  const submitInput = form.getByTestId("submit-input")
  return {inputArea, submitInput}
}

// Tests the given input area error handling with empty scenario & incorrect value scenario
const inputErrorHandlingTest = inputAreaTestId => {
  test("It should display an error status when empty", () => {
    const {inputArea, submitInput} = renderFormComponent(inputAreaTestId)
    fireEvent.change(inputArea, {target: {value: ""}})
    expect(submitInput.value).toBe("Please, fill all fields correctly")
  })

  test("It should display an error status when incorrect value", () => {
    const {inputArea, submitInput} = renderFormComponent(inputAreaTestId)
    fireEvent.change(inputArea, {target: {value: "Not a correct value"}})
    expect(submitInput.value).toBe("Please, fill all fields correctly")
  })
}

// Tests the given input area success handling
const inputSuccessHandlingTest = (inputAreaTestId, inputValue) => {
  test("It should not display an error in input class when correct value", () => {
    const {inputArea} = renderFormComponent(inputAreaTestId)
    fireEvent.change(inputArea, {target: {value: inputValue}})
    expect(/error/i.test(inputArea.className)).toBeFalsy()
  })
}

describe("Form inputs Error handling", () => {
  // Test Latitude input error handling
  describe("Latitude input", () => {
    inputErrorHandlingTest("latitude-input")
  })

  // Test Longitude input error handling
  describe("Longitude input", () => {
    inputErrorHandlingTest("longitude-input")
  })

  // Test Pannel Area input error handling
  describe("Pannel Area input", () => {
    inputErrorHandlingTest("pannel-area-input")
  })
})

describe("Form inputs success handling", () => {
  // Test Latitude input Success
  describe("Latitude input", () => {
    inputSuccessHandlingTest("latitude-input", 49.249)
  })
  // Test Longitude input Success
  describe("Longitude input", () => {
    inputSuccessHandlingTest("longitude-input", 5.951)
  })
  // Test Pannel Area input Success
  describe("Pannel Area input", () => {
    inputSuccessHandlingTest("pannel-area-input", 30)
  })
})

describe("Submit handler success handling", () => {
  test("It should call the submit hanlder once when correct inputs", async () => {
    // Create a mock submit handler
    const mockClickHanlder = jest.fn()
    // Pass this function as a Form prop
    const form = render(<Form fetchEnergyEstimation={mockClickHanlder} />)
    const latitudeInput = form.getByTestId("latitude-input")
    const longitudeInput = form.getByTestId("longitude-input")
    const pannelAreaInput = form.getByTestId("pannel-area-input")
    const submitInput = form.getByTestId("submit-input")

    fireEvent.change(latitudeInput, {target: {value: 49.249}})
    fireEvent.change(longitudeInput, {target: {value: 5.951}})
    fireEvent.change(pannelAreaInput, {target: {value: 30}})
    fireEvent.click(submitInput)

    // Test Submit button status
    expect(submitInput.value).toBe("Submit !")
    // Test click handler
    expect(mockClickHanlder).toHaveBeenCalledTimes(1)
  })
})

describe("Submit handler error handling", () => {
  test("It shouldln't call the submit handler when incorrect inputs", async () => {
    // Create a mock submit handler
    const mockClickHanlder = jest.fn()
    // Pass this function has a Form prop
    const form = render(<Form fetchEnergyEstimation={mockClickHanlder} />)
    const submitInput = form.getByTestId("submit-input")

    fireEvent.click(submitInput)

    // Test click handler
    expect(mockClickHanlder).toHaveBeenCalledTimes(0)
  })
})
