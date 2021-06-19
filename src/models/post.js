const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
   
    description: {
        type: String,
        // required: true,
       
    },

    postImg: [
       {}
    ],

    category: {
        type: String,
        required: true
    },
    tags: [String],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
           required:true
    },
    upDatedAt: Date
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);