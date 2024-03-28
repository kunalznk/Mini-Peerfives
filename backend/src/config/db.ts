require('dotenv').config()
import mongoose from "mongoose";

const mongo = mongoose.connect("mongodb+srv://kunalznk:Mumbai%254088@cluster0.ijls3.mongodb.net/" ,  {
    autoIndex:false,
    autoCreate:true,
    dbName:"min-peerfives",
}, ()=> {
    console.log("connected")
});

export default mongo