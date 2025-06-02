require('dotenv').config();
const express = require('express');
const {connectDB} = require('./src/config/db');
const usersRouter = require('./src/api/routes/user');
const housesRouter = require('./src/api/routes/house');
const NeighborhoodsRouter = require('./src/api/routes/neighborhood');

const app = express();

app.use(express.json());

app.use("/api/v1/users", usersRouter)
app.use("/api/v1/house", housesRouter)
app.use("/api/v1/Neighborhoods", NeighborhoodsRouter)

connectDB();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});