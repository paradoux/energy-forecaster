// Modules imports
import express from "express"

// App imports
import pgisReadOne from "../controllers/pgis"

// Creates Express router
const router = new express.Router()

// Handle request with ctrlPgis controllers
router.get("/pgis-data", pgisReadOne)

// Wrong endpoint error handler
router.use("/*", (req, res) => {
  res.status(404)
  res.json({error: "API endpoint not found"})
})

export default router
