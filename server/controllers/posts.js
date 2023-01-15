import express from "express";
import mongoose from "mongoose";

import PostMessage from "../models/postMessage.js";

const router = express.Router();

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);
    if (!post)
      return res.status(404).json({ message: "No such a post exists" });
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const newPostMessage = new PostMessage({
    ...req.body,
    creator: req.userId,
  });

  try {
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({message:`No post with id: ${id}`});

  const newPost = await PostMessage.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.json(newPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({message:`No post with id: ${id}`});

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};


export const likePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({message:`No post with id: ${id}`});

    const updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      { $inc: { likeNumber: 1 }, $push: { likeUser: req.userId } },
      { new: true }
    );
    
    res.json({ message: "post liked", postData: updatedPost });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

export const unlikePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({message:`No post with id: ${id}`});

    const updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      { $inc: { likeNumber: -1 }, $pull: { likeUser: req.userId } },
      { new: true }
    );

    res.json({ message: "post unliked", postData: updatedPost });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

export default router;
