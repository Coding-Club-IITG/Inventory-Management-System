require('dotenv').config()
const express = require("express");
const jwt = require('jsonwebtoken');
const itemRouter = express.Router();
const { download, addItem, listAllItems, deleteItem, returnItem, uploadImage, editItem, editDocument } = require("../controllers/item.js");
const authenticateToken = require('../middleware/authToken.js');
const multer = require("multer");

//With authentication token
// itemRouter.route("/")
//     .post(authenticateToken, addItem)
//     .get(authenticateToken, listAllItems)
//     .delete(authenticateToken, deleteItem);

//Without token

// const app = express();
// app.use(cors());
// app.use(express.json());
const upload = multer({ storage: multer.memoryStorage() });
const filesUploader = upload.fields([{ name: 'bill', maxCount: 1 }, { name: 'sanctionLetter', maxCount: 1 }, { name: 'purchaseOrder', maxCount: 1 }, { name: 'inspectionReport', maxCount: 1 }])
const singleFileUploader = upload.single("image");
itemRouter.route("/")
    .post(authenticateToken, filesUploader, addItem)
    .get(authenticateToken, listAllItems)
    .delete(authenticateToken, deleteItem);
itemRouter.put("/return", authenticateToken, returnItem);
itemRouter.get("/download", authenticateToken, download);
itemRouter.put("/:id", authenticateToken, editItem)
// itemRouter.put("/document/:documentId",editDocument)
itemRouter.put('/:documentId/:documentType', authenticateToken, upload.single("file"), editDocument)
itemRouter.post("/upload", authenticateToken, upload.single("image"), uploadImage)
module.exports = itemRouter;

