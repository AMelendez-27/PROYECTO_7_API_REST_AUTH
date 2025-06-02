require('dotenv').config();
const express = require('express');
const {connectDB} = require('./src/config/db');
const carsRouter = require('./src/api/routes/car');
const carDealershipsRouter = require('./src/api/routes/carDealership');

const app = express();

app.use(express.json());

app.use("/api/v1/cars", carsRouter)
app.use("/api/v1/carDealerships", carDealershipsRouter)

connectDB();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});