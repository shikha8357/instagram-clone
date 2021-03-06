const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
    , photo: {
        type: String,
        required: true
        // default:"no photo"
    },
    likes: [{ type: ObjectId, ref: "User" }],
    comments: [{
        text: String,
        postedBy: { type: ObjectId, ref: "User" }
    }],
    postedBy: {
        type: ObjectId,
        ref: "User"
    }
},{timestamps:true})
mongoose.model("Post", postSchema);


// timestamps is used to create a unique field named as "createdfield" to add soting functionality to post route