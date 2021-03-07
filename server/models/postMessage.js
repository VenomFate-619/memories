import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    userName:String,
    tags: [String],
    selectedFile: String,
    likeCount: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    }
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;