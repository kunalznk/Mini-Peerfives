require('dotenv').config()
import mongoose from "mongoose";

const mongo = mongoose.connect(process.env.DB! ,  {
    autoIndex:false,
    autoCreate:true,
    dbName:"min-peerfives",
}, ()=> {
    console.log("connected")
});

export default mongo