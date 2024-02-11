const express = require("express");
const app = express();
require('dotenv').config();
const bodyParser = require("body-parser");
const cors = require("cors");
const corsOptions = {
	origin: '*',
	credentials: true,            //access-control-allow-credentials:true
	optionSuccessStatus: 200,
}
const itemsCronJob = require('./controllers/cronJob');
const morgan=require('morgan');
app.use(cors(corsOptions))
app.use(morgan("dev"));
// const cookieParser = require("cookie-parser");
const itemRouter = require("./routes/itemRoutes.js");
const requestRouter = require("./routes/requestRoutes.js");
const mongoose = require("mongoose");
const URI = process.env.MONGO_URI;
app.use(bodyParser.json());

const port = 8080;
mongoose
	.connect(URI)
	.then((result) => {
		console.log("connected");
		console.log(`Server listening on port ${port}`);
		app.listen(port);
	})
	.catch((err) => {
		console.log(err);
	});
// app.use(cookieParser);
app.use("/item", itemRouter);
app.use("/request", requestRouter);
///cronJob
itemsCronJob()
