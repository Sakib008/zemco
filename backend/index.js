const cors = require('cors')
const express = require('express')

const cookieParser = require('cookie-parser')
const initializeDatabase = require("./db/db.connect")
const RestaurantRouter = require('./routes/restaurant.router')
const AuthRouter = require('./routes/auth.router')
const ReviewRouter = require('./routes/review.router')
const ImageRouter = require("./routes/imageUpload.router")

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: "https://zemco.vercel.app/", // Update this if your frontend runs elsewhere
  credentials: true
}));

initializeDatabase()

app.use('/api/restaurants',RestaurantRouter)
app.use('/api/auth',AuthRouter)
app.use('/api/reviews',ReviewRouter)
app.use('/api/image',ImageRouter)

app.get('/',((req,res)=>{
    res.send("Zomato Clone is Real : See------")
}))


const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>console.log("Server is Running on PORT : ",PORT))
