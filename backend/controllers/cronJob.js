const cron = require("node-cron");
const Item = require("../models/itemSchema");
const Request = require("../models/requestSchema");
const moment = require("moment");

const itemsCronJob = () => {
  // Choose default cron jobs for 1 minutes
  cron.schedule("* * * * *", async () => {
    const currentTimestamp = moment().valueOf();
    try {
      // Query for all items whose "endDate" field is less than the current date/time
      // and whose "occupiedTime" array contains at least one object whose "endTime"
      // field is less than the currentTimestamp
      const expiredItems = await Item.find({
        bookings: {
          $elemMatch: {
            outTime: { $lt: currentTimestamp },
          },
        },
      });

      // Check items currently in use
      const inUseItems = await Item.find({
        bookings: {
          $elemMatch: {
            inTime: { $lt: currentTimestamp },
            outTime: { $gt: currentTimestamp },
          },
        },
      });

      // Update the status of each expired item
      await Promise.all(
        expiredItems.map(async (expiredItem) => {
          // const expiredRequests = expiredItem.bookings.filter(request => request.outTime <= currentTimestamp);
          

          expiredItem.bookings = expiredItem.bookings.filter(request => request.outTime > currentTimestamp);
          // If there is no more occupiedTime, set the status to 'available'
          if (expiredItem.bookings.length === 0) {
            expiredItem.status = "Available";
            expiredItem.heldBy = expiredItem.ownedBy;
          } else {
            // Otherwise, find the next startTime and set the status to 'occupied' if it has been reached
            const nextStartTime = expiredItem.bookings[0].inTime;
            if (nextStartTime <= currentTimestamp) {
              expiredItem.status = "Occupied";
            }
            else {
              expiredItem.status = "Available";
              expiredItem.heldBy = expiredItem.ownedBy;
            }
          }
          // Save the updated item
          await expiredItem.save();
          console.log(expiredItem)
        })
      );

      // Update status of booked items, if time arrives
      await Promise.all(
        inUseItems.map(async (inUseItem) => {
        inUseItem.bookings = inUseItem.bookings.filter(request => request.outTime > currentTimestamp);
        // If there is no more occupiedTime, set the status to 'available'
        if (inUseItem.bookings.length === 0) {
          inUseItem.status = "Available";
          inUseItem.heldBy = inUseItem.ownedBy;
        } else {
          // Otherwise, find the next startTime and set the status to 'occupied' if it has been reached
          const nextStartTime = inUseItem.bookings[0].inTime;
          if (nextStartTime <= currentTimestamp) {
            inUseItem.status = "Occupied";
          }
          else {
            inUseItem.status = "Available";
            inUseItem.heldBy = inUseItem.ownedBy;
          }
        }
        // Save the updated item
        await inUseItem.save();
        console.log(inUseItem);
      })
      );
      console.log(`Updated status for ${expiredItems.length} expired items and ${inUseItems.length} booked items`);
    } catch (error) {
      console.error("Error updating item statuses:", error);
    }
  });
};

module.exports = itemsCronJob;
