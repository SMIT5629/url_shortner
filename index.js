require("dotenv").config()
const express = require("express")
const {connectDB} = require("./db")
const urlRoutes = require("./routes/url.route.js")
const morgan = require("morgan")

const app = express()
connectDB();

app.use(express.json())
app.use(morgan("dev"))

app.use("/api",urlRoutes)

app.get("/",(req,res)=>{
    res.send("your app is runing!")
})


app.listen(3000, () => {
    console.log("your App running on http://localhost:3000")
})