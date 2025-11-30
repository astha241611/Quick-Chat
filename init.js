import mongoose, { model, mongo, Schema } from 'mongoose';
import chat from "./model/chat.js";

main()
    .then(() =>{
        console.log("Connection Successful");
    })
    .catch((err) =>{
        console.log(err);
    })
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/messenger');  
    // Database name
}

let chats = [
    {
        from: "Neha",
        to: "Depak",
        msg: "I am coming to the park",
        created_at: new Date()
    },
    {
        from: "Mansi",
        to: "Kajal",
        msg: "I am late today",
        created_at: new Date()
    },
    {
        from: "Riya",
        to: "Priya",
        msg: "Have you done your work",
        created_at: new Date()
    },
    {
        from: "Aryan",
        to: "Anish",
        msg: "Today is the deadline",
        created_at: new Date()
    },
    {
        from: "Nancy",
        to: "Rahul",
        msg: "Are you ok?",
        created_at: new Date()
    },
    {
        from: "Tina",
        to: "Anjali",
        msg: "Tomorrow we will go for shopping",
        created_at: new Date()
    },
]

chat.insertMany(chats);