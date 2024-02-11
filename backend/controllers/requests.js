const Request = require("../models/requestSchema.js");
const Item = require("../models/itemSchema.js");
const User = require("../models/userSchema.js");
const sendEmail = require("../utils/sendEmail.js");

module.exports.getSentRequests = async (req, res) => {
    try {
        // const user = await User.findOne({userID: req.user.userID});
        // const allRequests= await Request.find({requestedBy: req.user.club});
        const allRequests = await Request.find({ requestedBy: req.query.user });
        res.json(allRequests);
    }
    catch (err) {
        res.send(err);
        console.log(err);
    }
}
module.exports.getReceivedRequests = async (req, res) => {
    try {
        // const user = await User.findOne({userID: req.user.userID});
        // const allRequests= await Request.find({ownedBy: req.user.club});
        const allRequests = await Request.find({ ownedBy: req.query.user });
        res.json(allRequests);
    }
    catch (err) {
        res.send(err);
        console.log(err);
    }
}

module.exports.acceptRequest = async (req, res) => {
    try {
        const targetRequest = await Request.findOneAndUpdate(
            { _id: req.body.requestId },
            { requestStatus: `Approved` }
        );
        const user= await User.findOne({club: targetRequest.requestedBy});
        console.log(user);
        sendEmail(user.userID, "IMS: Request for Item Approved", `Greetings,<br><br>Your request for the item <b>${targetRequest.name}</b> has been <b>approved</b>. Check the IMS Portal for more details.<br><br>Warm Regards,<br>Coding Club IIT Guwahati`);
        const item = await Item.findOneAndUpdate(
            { _id: targetRequest?.itemId },
            { "status": "Booked for future use.", $push: { "bookings": targetRequest } }
        );
        res.json({
            item: item,
            req: targetRequest
        })
    }
    catch (err) {
        res.send(err);
        console.log(err);
    }
}

module.exports.rejectRequest = async (req, res) => {
    try {
        // const user = await User.findOne({userID: req.user.userID});
        const targetRequest = await Request.findOneAndUpdate(
            { _id: req.body.requestId },
            // {requestStatus:`Declined by ${req.user.club}`}
            { requestStatus: `Declined` }
        );
        const user= await User.findOne({club: targetRequest.requestedBy});
        console.log(user);
        sendEmail(user.userID, "IMS: Request for Item Declined", `Greetings,<br><br>Your request for the item <b>${targetRequest.name}</b> has been <b>declined</b>. Check the IMS Portal for more details.<br><br>Warm Regards,<br>Coding Club IIT Guwahati`);
        res.json(targetRequest);
    }
    catch (err) {
        res.send(err);
        console.log(err);
    }
}
module.exports.newRequest = async (req, res) => {
    const request = req.body;
    // request.requestedBy = req.user.club;
    const newRequest = new Request(request);
    try {
        newRequest.save();
        const user= await User.findOne({club: newRequest.ownedBy});
        console.log(user);
        sendEmail(user.userID, "IMS: Requesting Approval", `Greetings,<br><br>This is to inform you that ${newRequest.requestedBy} is waiting for your kind approval for <b>${newRequest.name}</b>. Kindly check the IMS Portal for more details.<br><br>Warm Regards,<br>Coding Club IIT Guwahati`);
        res.send(newRequest);
    }
    catch (err) {
        res.send(err);
        console.log(err);
    }
}

module.exports.deleteRequest = async (req, res) => {
    try {
        const id = req.body.ID;
        const targetRequest = await Request.findOne({ _id: id });
        // const time = {
        //     "Start": targetRequest.inTime,
        //     "End": targetRequest.outTime
        // };
        const item = await Item.findOneAndUpdate(
            { _id: targetRequest.itemId },
            { "status": "bcd", $pull: { "bookings": targetRequest } }
        );
        Request.findByIdAndRemove(id, (err, doc) => {
            if (!err) {
                res.status(200).send({ result: "Success" });
            } else {
                res.send(err);
                console.log(err);
            }
        })
    }
    catch {
        res.send(err);
        console.log(err);
    }
}

module.exports.returnItem = async (req, res) => {
    try {
    //   console.log(req.body);
      //Update status to available, and held by back to original 
      const updatedRequest = await Request.findByIdAndUpdate(
        {_id:req.body.data.ID},
        {requestStatus: "Item Returned"},
        {new:true}
      );
      const updatedItem = await Item.findOneAndUpdate(
        { _id: updatedRequest.itemId },
        { heldBy: updatedRequest.ownedBy, status: "Available" },
        {new:true}
      );
      
      if (!updatedItem) res.status(404).send({ result: "Item Not Found" });
      
      
  
      // Remove the first request from the bookings array
      if ((updatedItem.bookings).length!=0)
        updatedItem.bookings.shift();
      await updatedItem.save();
  
      res.status(200).send({result:"Success"});
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  };
  