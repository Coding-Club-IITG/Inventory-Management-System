require('dotenv').config()
const express = require("express");
const jwt = require('jsonwebtoken');
const requestRouter = express.Router();
const { getSentRequests, getReceivedRequests, newRequest, acceptRequest, rejectRequest, deleteRequest,returnItem } = require("../controllers/requests.js");
const authenticateToken = require('../middleware/authToken.js');


// requestRouter.get("/sent", authenticateToken, getSentRequests)
// requestRouter.get("/received", authenticateToken, getReceivedRequests);
// requestRouter.post("/", authenticateToken, newRequest);
// requestRouter.put("/accept",authenticateToken,acceptRequest);
// requestRouter.put("/reject",authenticateToken,rejectRequest);
requestRouter.get("/sent", authenticateToken, getSentRequests)
requestRouter.get("/received", authenticateToken, getReceivedRequests);
requestRouter.post("/", authenticateToken, newRequest);
requestRouter.delete("/delete", authenticateToken, deleteRequest);
requestRouter.put("/accept", authenticateToken, acceptRequest);
requestRouter.put("/reject", authenticateToken, rejectRequest);
requestRouter.put("/return",returnItem);
module.exports = requestRouter;