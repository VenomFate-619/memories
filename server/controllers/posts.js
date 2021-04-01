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
    return res.status(404).send(`No post with id: ${id}`);

  const newPost = await PostMessage.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.json(newPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};

// likes functionalitychanges  beaware
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);
    const post = await PostMessage.findById(id);

    const index = post.likeCount.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likeCount.push(req.userId);
    } else {
      post.likeCount = post.likeCount.filter((id) => id !== String(req.userId));
    }

    // const updatedPost = await PostMessage.findByIdAndUpdate(id, { $inc:{like:1} }, { new: true });
    await post.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

export default router;
