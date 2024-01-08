const express = require("express");
const app = express();
const cors = require('cors');
const graphController = require("./src/http/controller/graphController");
require("./src/store/util");
require("dotenv").config();
const path = require('path'); 

const PORT = 9000;
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));
app.get("/api/getAllData", graphController.getAllData);
app.get("/api/getByFilter", graphController.getFilterData);

app.listen(PORT, ()=>{
    console.log("app is running");
})