import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  userName: String,
  tags: [String],
  selectedFile: String,
  likeUser: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likeNumber: { type: Number, default: 0 },
});

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;