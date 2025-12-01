
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

