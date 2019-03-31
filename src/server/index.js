import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import path from "path"
// Create a server
const app = express()

// Enable CORS
app.use(cors())

// Allows the app to parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
console.log("Bonjour")

// Use body-parser as middleware for the app.
app.use(bodyParser.json())

// Serves the index.html
app.use(express.static(path.resolve(__dirname, "public")))

app.use("/", (req, res) => {
  console.log("Vive la France!")
})

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`)
})
