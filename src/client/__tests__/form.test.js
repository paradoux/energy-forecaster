// Modules imports
import React from "react"
import "babel-polyfill"
import {render, fireEvent, cleanup, waitForElement} from "react-testing-library"

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

describe("Form component Error handling", () => {
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

describe("Form component success handling", () => {
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
