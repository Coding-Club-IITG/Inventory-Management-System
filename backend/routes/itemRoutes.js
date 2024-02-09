require('dotenv').config()
const express = require("express");
const jwt = require('jsonwebtoken');
const itemRouter = express.Router();
const { download, addItem, listAllItems, deleteItem, returnItem, editItem, editDocument } = require("../controllers/item.js");
const authenticateToken = require('../middleware/authToken.js');
const multer = require("multer");
const fs = require('fs');
//With authentication token
// itemRouter.route("/")
//     .post(authenticateToken, addItem)
//     .get(authenticateToken, listAllItems)
//     .delete(authenticateToken, deleteItem);

//Without token

// const app = express();
// app.use(cors());
// app.use(express.json());

//multer middleware
//firebase 
// const upload = multer({ storage: multer.memoryStorage() });
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let dest;
        fs.mkdirSync('uploads/', { recursive: true });
        if (file.fieldname === 'file') {
            dest = 'uploads/'+req.params.documentType+'s/';
        } 
        else{
            dest= 'uploads/'+file.fieldname+'s/';
        }
        fs.mkdirSync(dest, { recursive: true });
        cb(null, dest);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      let type=file.fieldname;
      if (file.fieldname==="file"){type=req.params.documentType}
      cb(null, type+'-'+file.originalname.split('.')[0] + '-' + uniqueSuffix + '.' + file.originalname.split('.')[1]);
    }
  });
const upload = multer({ storage: storage });
const filesUploader = upload.fields([{ name: 'bill', maxCount: 1 }, { name: 'sanctionLetter', maxCount: 1 }, { name: 'purchaseOrder', maxCount: 1 }, { name: 'inspectionReport', maxCount: 1 }])


itemRouter.route("/")
    .post(authenticateToken, filesUploader, addItem)
    .get(authenticateToken, listAllItems)
    .delete(authenticateToken, deleteItem);
itemRouter.put("/return", authenticateToken, returnItem);
itemRouter.get("/download", authenticateToken, download);
itemRouter.put("/:id", authenticateToken, editItem)
// itemRouter.put("/document/:documentId",editDocument)
itemRouter.put('/:documentId/:documentType', authenticateToken, upload.single("file"), editDocument)
// itemRouter.post("/upload", authenticateToken, upload.single("image"), uploadImage)
module.exports = itemRouter;

