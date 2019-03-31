// Modules imports
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import path from "path"

// App imports
import routes from "./routes"

// Create a server
const app = express()

// Enable CORS
app.use(cors())

// Allows the app to parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Use body-parser as middleware for the app.
app.use(bodyParser.json())

// Serves the index.html
app.use(express.static(path.resolve(__dirname, "public")))

// Uses api routes
app.use("/api", routes)

// Error handler
app.use("*", (err, req, res, next) => {
  res.status(err.status)
  res.json({err})
  next()
})

// Set port
const port = process.env.PORT || 8080

// Launch server
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`)
})

export default app
