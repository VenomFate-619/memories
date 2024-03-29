import express from 'express';
import auth from '../middleware/auth.js'
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  likePost,
  deletePost,
  unlikePost,
} from "../controllers/posts.js";

const router = express.Router();

router.get('/', getPosts);
router.post('/',auth , createPost);
router.get('/:id', getPost);
router.patch('/:id',auth, updatePost);
router.delete('/:id',auth, deletePost);
router.patch('/:id/likePost',auth, likePost);
router.patch("/:id/unlikePost", auth, unlikePost);

export default router;