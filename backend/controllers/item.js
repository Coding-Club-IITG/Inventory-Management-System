const mongoose = require("mongoose");
const Item = require("../models/itemSchema.js");
const ItemDocument = require("../models/itemDocumentSchema.js");
//firebase below
// const {
//   ref,
//   getDownloadURL,
//   uploadBytesResumable,
// } = require("firebase/storage");
// const storage = require("../config/config.js");

const _ = require("lodash");
// const multer = require('multer');

// module.exports.uploadImage = async (req, res) => {
//   console.log(req.file);
//   const timestamp = Date.now();
//   if (req.file) {
//     console.log(req.file);
//     const fileName = `${req.file.originalname.split(".")[0]}_${timestamp}.${req.file.originalname.split(".")[1]
//       }`;
//     const fileRef = ref(storage, fileName);

//     try {
//       const fileSnapshot = await uploadBytesResumable(
//         fileRef,
//         req.file.buffer,
//         {
//           contentType: req.file.mimetype,
//         }
//       );
//       const fileURL = await getDownloadURL(fileSnapshot.ref);
//       res.status(200).json({ url: fileURL });
//     } catch (err) {
//       res.status(500).send(err);
//       console.log(err);
//     }
//   } else {
//     return res.status(400).json({ error: "Image file is required" });
//   }
// };
module.exports.download = async (req, res) => {
  const timestamp = Date.now();
  if (req.files["bill"]) {
    const fileNameBill = `${req.files["bill"][0].originalname.split(".")[0]
      }_${timestamp}.${req.files["bill"][0].originalname.split(".")[1]}`;
    const billRef = ref(storage, fileNameBill);

    try {
      const billSnapshot = await uploadBytesResumable(
        billRef,
        req.files["bill"][0].buffer,
        {
          contentType: req.files["bill"][0]?.mimetype,
        }
      );
      billURL = await getDownloadURL(billSnapshot.ref);
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
    }
  } else {
    return res.status(400).json({ error: "Bill file is required" });
  }
};

module.exports.addItem = async (req, res) => {
  console.log("Add item API called");
  console.log(req.files["bill"]);
  let billURL="", sanctionURL="", purchaseURL="", inspectionURL="";
  if ((req.files["bill"]))  billURL = req.files["bill"].filename;
  if ((req.files["sanctionLetter"])) sanctionURL = req.files['sanctionLetter'].filename;
  if ((req.files["purchaseOrder"])) purchaseURL = req.files['purchaseOrder'].filename;
  if ((req.files["inspectionReport"])) inspectionURL = req.files['inspectionReport'].filename;
  let savedItemDocument = {};
  const timestamp = Date.now();
  console.log("AddItem called");
  console.log(req.body);
  // // firebase code below
  // const timestamp = Date.now();
  // // Upload bill to firebase
  // if (req.files["bill"]) {
  //   // Give unique name to bill with bill+timestamp to save in database
  //   const fileNameBill = `${req.files["bill"][0].originalname.split(".")[0]
  //     }_${timestamp}.${req.files["bill"][0].originalname.split(".")[1]}`;
  //   const billRef = ref(storage, fileNameBill);

  //   try {
  //     const billSnapshot = await uploadBytesResumable(
  //       billRef,
  //       req.files["bill"][0].buffer,
  //       {
  //         contentType: req.files["bill"][0]?.mimetype,
  //       }
  //     );
  //     billURL = await getDownloadURL(billSnapshot.ref);
  //   } catch (err) {
  //     res.status(500).send(err);
  //     console.log(err);
  //   }
  // }

  // // Upload sanctionLetter to firebase
  // if (req.files["sanctionLetter"]) {
    
  //   // Give unique name to sanctionLetter+timestamp to save in database
  //   const fileNameSanctionLetter = `${req.files["sanctionLetter"][0].originalname.split(".")[0]
  //     }_${timestamp}.${req.files["sanctionLetter"][0].originalname.split(".")[1]
  //     }`;
  //   const sanctionRef = ref(storage, fileNameSanctionLetter);

  //   try {
  //     const sanctionLetterSnapshot = await uploadBytesResumable(
  //       sanctionRef,
  //       req.files["sanctionLetter"][0].buffer,
  //       {
  //         contentType: req.files["sanctionLetter"][0]?.mimetype,
  //       }
  //     );
  //     sanctionURL = await getDownloadURL(sanctionLetterSnapshot.ref);
  //   } catch (err) {
  //     res.status(500).send(err);
  //     console.log(err);
  //   }
  // }

  //   if (req.files["purchaseOrder"]) {
  //     // Give unique name to purchasedOrder+timestamp to save in database
  //     const fileNamePurchaseOrder = `${
  //       req.files["purchaseOrder"][0].originalname.split(".")[0]
  //     }_${timestamp}.${req.files["purchaseOrder"][0].originalname.split(".")[1]}`;
  //     const purchaseOrderRef = ref(storage, fileNamePurchaseOrder);

  //     try {
  //       const purchaseOrderSnapshot = await uploadBytesResumable(
  //         purchaseOrderRef,
  //         req.files["purchaseOrder"][0].buffer,
  //         {
  //           contentType: req.files["purchaseOrder"][0]?.mimetype,
  //         }
  //       );
  //       purchaseURL = await getDownloadURL(purchaseOrderSnapshot.ref);
  //     } catch (err) {
  //       res.status(500).send(err);
  //       console.log(err);
  //     }
  //   }

  // if (req.files["inspectionReport"]) {
    
  //   // Give unique name to inspectionReport+timestamp to save in database
  //   const fileNameInspectionReport = `${req.files["inspectionReport"][0].originalname.split(".")[0]
  //     }_${timestamp}.${req.files["inspectionReport"][0].originalname.split(".")[1]
  //     }`;
  //   const inspectionReportRef = ref(storage, fileNameInspectionReport);
  //   try {
  //     const inspectionReportSnapshot = await uploadBytesResumable(
  //       inspectionReportRef,
  //       req.files["inspectionReport"][0].buffer,
  //       {
  //         contentType: req.files["inspectionReport"][0]?.mimetype,
  //       }
  //     );
  //     inspectionURL = await getDownloadURL(inspectionReportSnapshot.ref);
  //   } catch (err) {
  //     res.status(500).send(err);
  //     console.log(err);
  //   }
  // }

  // save the documents
  const itemDocument = new ItemDocument({
    serialNo: req.body.serialNo? req.body.serialNo: "",
    pageNo: req.body.pageNo? req.body.pageNo: "",
    registerNo: req.body.registerNo? req.body.registerNo:"",
    bill: billURL,
    sanctionLetter: sanctionURL,
    inspectionReport: inspectionURL,
    purchaseOrder: purchaseURL,
  });
  try {
    savedItemDocument = await itemDocument.save();
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
  console.log("File successfully uploaded.");

  const { itemsList, ...rest } = req.body;
  /// making entry of each item in database
  const promises = itemsList?.map(async (data) => {
    const newItem = new Item({
      name: data.name,
      category: data.category,
      ownedBy: req.user ? req.user.club : data.ownedBy, // Change after authentication setup complete
      heldBy: data.heldBy ? data.heldBy : data.ownedBy,
      quantity: data.quantity,
      purchasedOn: data.purchasedOn,
      // bill: billURL,
      // sanctionLetter: sanctionURL,
      // purchaseOrder: purchaseURL,
      // inspectionReport: inspectionURL,
      itemDocument: new mongoose.Types.ObjectId(savedItemDocument._id), // Assigning an ObjectId to itemDocument field
      status: data.status,
      remarks: data.remarks,
      bookings: [],
    });

    try {
      const addedItem = await newItem.save();
      return addedItem;
    } catch (err) {
      console.log(err);
      throw err;
    }
  });

  try {
    const addedItems = await Promise.all(promises);
    res.status(201).send({
      result: "Success",
      items: addedItems,
      itemDocument: savedItemDocument,
    });
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
};

module.exports.listAllItems = async (req, res) => {
  try {
    // Find and return all items with no filter 
    const items = await Item.find();
    // console.log(items);
    res.status(201).json(items);
  } catch {
    res.status(500).send(err);
    console.log(err);
  }
};

module.exports.deleteItem = async (req, res) => {
  try {
    // Get item ID from request body and delete item
    const id = req.body.ID;
    Item.findByIdAndRemove(id, (err, doc) => {
      if (!err) {
        // Return on success
        res.status(200).send({ result: "Success" });
      } else {
        // return error
        res.send(err);
        console.log(err);
      }
    });
  } catch {
    res.send(err);
    console.log(err);
  }
};

module.exports.editItem = async (req, res) => {
  // Get item ID to be updated. Request body contains all updates to be done in the item in appropriate format 
  const itemId = req.params.id;
  const update = req.body;
  try {
    // Update the item in the Item collection, and only update the newly set values
    const updatedItem = await Item.findByIdAndUpdate(itemId, update, {
      new: true,
    });
    // Return the updated item
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
module.exports.editDocument = async (req, res) => {
  let url;
  // console.log(req.params);
  const documentId = req.params.documentId;
  const documentType = req.params.documentType;
  try {
    if (!req.file || Object.keys(req.file).length === 0) {
      throw new Error("Image not provided");
    }
    url = req.file.fileName;
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error while uploading image");
  }
  try {
    const update = {
      [documentType]: url,
    };
    // Update the document in the ItemDocument collection
    const updatedDocument = await ItemDocument.findByIdAndUpdate(
      documentId,
      update,
      {
        new: true,
      }
    );
    // Return the updated document
    res.json(updatedDocument);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error while updating document");
  }
};

module.exports.returnItem = async (req, res) => {
  try {

    //Update status to available, and held by back to original 
    const updatedItem = await Item.findOneAndUpdate(
      { _id: req.body.itemId },
      { heldBy: req.body.heldBy, status: "Available" }
    );
    if (!updatedItem) res.status(404).send({ result: "Item Not Found" });


    // Remove the first request from the bookings array
    updatedItem.bookings.shift();
    await updatedItem.save();

    res.json({ updatedItem, updatedBooking });
  } catch (err) {
    res.status(500).send(err);
  }
};
