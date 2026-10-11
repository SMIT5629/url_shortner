require("dotenv").config()
const express = require("express")
const path = require("path")
const {connectDB} = require("./db")
const urlRoutes = require("./routes/url.route.js")
const morgan = require("morgan")

const app = express()
connectDB();

app.use(express.json())
app.use(morgan("dev"))

app.use(express.static(path.join(__dirname, "public")))
app.use("/",urlRoutes)

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "public", "index.html"))
})


app.listen(3000, () => {
    console.log("your App running on http://localhost:3000")
})