import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
    },
    password:String
});

export const User=mongoose.model("User",UserSchema);

const tagSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    }
});

export const Tag=mongoose.model("Tag",tagSchema);

const contentSchema=new mongoose.Schema({
    link:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    tags:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Tag"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
});

export const Content=mongoose.model("Content",contentSchema);

const linkSchema=new mongoose.Schema({
    hash:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

export const Link=mongoose.model("Link",linkSchema);

