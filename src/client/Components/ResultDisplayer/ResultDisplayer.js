// Modules imports
import React from "react"

// Style import
import "./ResultDisplayer.scss"

const ResultDisplayer = props => (
  <div className="card card--result">
    <h2>Your potential solar energy production per year is about:</h2>
    <h1 data-testid="computed-result-displayer">
      {props.totalEnergyYearly} kWh
    </h1>
  </div>
)

export default ResultDisplayer
