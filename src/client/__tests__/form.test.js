import React from "react"
import {render, fireEvent, cleanup} from "react-testing-library"
import Form from "../Components/Form/Form"

afterEach(cleanup)

const form = render(<Form />)
const latitudeInput = form.getByTestId("latitude-input")
const longitudeInput = form.getByTestId("longitude-input")
const pannelAreaInput = form.getByTestId("pannel-area-input")
const submitInput = form.getByTestId("submit-input")

describe("Form component", () => {
  // Test Latitude input error handling
  describe("Latitude input", () => {
    test("It should display an error status when empty", () => {
      fireEvent.change(latitudeInput, {target: {value: ""}})
      expect(submitInput.value).toBe("Please, fill all fields correctly")
    })
    test("It should display an error status when incorrect value", () => {
      fireEvent.change(latitudeInput, {target: {value: ""}})
      expect(submitInput.value).toBe("Please, fill all fields correctly")
    })
  })

  // Test Longitude input error handling
  describe("Longitude input", () => {
    test("It should display an error status when empty", () => {
      fireEvent.change(longitudeInput, {target: {value: ""}})
      expect(submitInput.value).toBe("Please, fill all fields correctly")
    })
    test("It should display an error status when incorrect value", () => {
      fireEvent.change(longitudeInput, {target: {value: ""}})
      expect(submitInput.value).toBe("Please, fill all fields correctly")
    })
  })

  // Test Pannel Area input error handling
  describe("Pannel Area input", () => {
    test("It should display an error status when empty", () => {
      fireEvent.change(pannelAreaInput, {target: {value: ""}})
      expect(submitInput.value).toBe("Please, fill all fields correctly")
    })
    test("It should display an error status when incorrect value", () => {
      fireEvent.change(pannelAreaInput, {target: {value: "Not a number"}})
      expect(submitInput.value).toBe("Please, fill all fields correctly")
    })
  })
})
