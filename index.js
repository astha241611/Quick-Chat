<<<<<<< HEAD


import express from "express";
import ejs from 'ejs';
const app = express();
import mongoose, { model, mongo, Schema } from 'mongoose';
import path from 'path';
import { fileURLToPath } from "url";
import chat from "./model/chat.js";
import methodOverride from "method-override";



const _filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename);

app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

let port = 8000;
app.listen(port, (req,res) =>{
    console.log("Listening to the port");
})

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

app.get("/", (req,res) =>{
    res.send("Root Working");
})

app.get("/chats", async(req,res) =>{
    let chats = await chat.find();
    // console.log(chats);
    res.render("index.ejs", {chats})
})

app.get("/chats/new", (req,res) =>{
    res.render("new.ejs");
})

app.post("/chats", (req,res) =>{
    let {from, msg, to} = req.body;
    let newchat = new chat({
        from: from,
        msg: msg,
        to: to,
        created_at: new Date()
    });

    newchat.save().then(res =>{
        console.log("Chat saved");
    }).catch(err =>{
        console.log(err);
    })

    res.redirect("/chats");
})

app.get("/chats/:id/edit", async(req,res) =>{
    let {id} = req.params;
    let chats = await chat.findById(id);
    res.render("edit.ejs", {chats});
})

app.put("/chats/:id", async(req,res) =>{
    let {id} = req.params;
    let {changedChat} = req.body;
    let updatedChat = await chat.findByIdAndUpdate(id, {msg: changedChat}, {runValidators: true, new: true});
    console.log(updatedChat);
    res.redirect("/chats");
})

app.delete("/delete/:id", async(req,res) =>{
    let {id} = req.params;
    await chat.findByIdAndDelete(id);
    res.redirect("/chats");
})

=======
import express from "express";
import mongoose from "mongoose";
import User from "./models/user.js";
import Chat from "./models/chat.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// -------------------- MONGODB CONNECTION --------------------
async function main() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/quickchat");
        console.log("✅ Connected to MongoDB");

        // Seed users and chats
        await seedUsersAndChats();
    } catch (err) {
        console.log("❌ Error connecting to DB:", err);
    }
}

main();

// -------------------- ROUTES --------------------
app.get("/", (req, res) => {
    res.send("<h1>Quick Chat Backend is Running ✅</h1>");
});

app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/chats", async (req, res) => {
    try {
        const chats = await Chat.find().populate("sender receiver", "username");
        res.json(chats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/users", async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/chats", async (req, res) => {
    try {
        const { sender, receiver, message } = req.body;
        if (!sender || !receiver || !message) {
            return res.status(400).json({ error: "sender, receiver, and message are required" });
        }

        const newChat = new Chat({ sender, receiver, message });
        await newChat.save();
        res.status(201).json(newChat);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// -------------------- SEED FUNCTION --------------------
const seedUsersAndChats = async () => {
    try {
        // Seed Users only if empty
        const userCount = await User.countDocuments();
        let users;
        if (userCount === 0) {
            users = await User.insertMany([
                { username: "Astha", age: 22 },
                { username: "Riya", age: 21 },
                { username: "Adam", age: 25 }
            ]);
            console.log("✅ Users seeded");
        } else {
            users = await User.find();
        }

        // Seed Chats only if empty
        const chatCount = await Chat.countDocuments();
        if (chatCount === 0) {
            await Chat.insertMany([
                { sender: users[0]._id, receiver: users[1]._id, message: "Hi Riya!" },
                { sender: users[1]._id, receiver: users[0]._id, message: "Hello Astha!" },
                { sender: users[2]._id, receiver: users[0]._id, message: "Hey Astha!" }
            ]);
            console.log("✅ Chats seeded");
        }
    } catch (err) {
        console.log("❌ Error seeding data:", err);
    }
};

// -------------------- START SERVER --------------------
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
>>>>>>> cbd6225db339c72e0d1c138b6f84e7c14084de61
