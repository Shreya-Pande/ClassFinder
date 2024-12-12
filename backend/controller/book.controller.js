// import express from "express"
// import Book from "../model/book.model.js"

// const router = express.Router();

// export const getBook= async (req,res) =>{
//     const { block, dayOfWeek, startTime, endTime } = req.query;

//     // Validate query parameters
//     if (!block || !dayOfWeek || !startTime || !endTime) {
//         return res.status(400).json({ message: "All query parameters are required." });
//     }


//     try {
//         // Find all conflicting rooms
//         const conflictingRooms = await Book.find({
//             BlockName: block,
//             DayOfWeek: dayOfWeek,
//             // $or: [
//             //     { StartTime: { $lt: endTime }, EndTime: { $gt: startTime } }
//             // ]

//             StartTime: startTime,
//             EndTime:endTime
//         }).distinct('RoomNumber');

//         // Get all rooms in the block
//         const allRooms = await Book.distinct('RoomNumber', { BlockName: block });

//         // Filter out conflicting rooms
//         const availableRooms = allRooms.filter(room => !conflictingRooms.includes(room));

//         // Respond with the available rooms
//         if (availableRooms.length) {
//             res.status(200).json({ availableRooms });
//         } else {
//             res.status(404).json({ message: 'No available rooms found.' });
//         }

//         // const book=Book.find();
//         // res.status(200).json(book);
//     }catch(error){
//         console.log("Error: ",error);
//         res.status(500).json(error);
//     }
// }










import express from "express";
import Book from "../model/book.model.js";

const router = express.Router();

export const getBook = async (req, res) => {
    const { block, dayOfWeek, startTime, endTime } = req.query;

    // Validate query parameters
    if (!block || !dayOfWeek || !startTime || !endTime) {
        return res.status(400).json({ message: "All query parameters are required." });
    }

    try {
        // Find rooms matching all 4 parameters
        const matchingRooms = await Book.find({
            BlockName: block,
            DayOfWeek: dayOfWeek,
            StartTime: startTime,
            EndTime: endTime
        }).distinct('RoomNumber');

        // Respond with the list of matching rooms
        if (matchingRooms.length > 0) {
            return res.status(200).json({ matchingRooms });
        } else {
            return res.status(404).json({ message: "No rooms found matching the given criteria." });
        }
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};
