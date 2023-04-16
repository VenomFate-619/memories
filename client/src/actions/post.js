import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  REQUEST,
  UPDATE_ID,
} from "../constant/actionTypes";
import { Notify } from "notiflix";
import * as api from "../api";
import { undo } from "redux-undo-action";

const remove = (id) => {
  return { type: DELETE, payload: id };
};

const addPost = (data) => {
  return { type: CREATE, payload: data };
};

const changeLikeCount = (id, getState, isLikeByMe) => {
  let posts = getState().posts?.posts ?? [];
  const user = JSON.parse(localStorage.getItem("profile"));
  let userId = user?.result?._id ?? "";
  let post = posts.find((p) => p._id === id);

  if (post) {
    post = {
      ...post,
      likeUser: isLikeByMe
        ? post.likeUser.filter((p) => p !== userId)
        : [...post.likeUser, userId],
      likeNumber: isLikeByMe ? post.likeNumber - 1 : post.likeNumber + 1,
    };
  }

  return { type: LIKE, payload: post };
};

// action creators
export const getPosts = () => async (dispatch) => {
  try {
    var { data } = await api.fetchPosts();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
    Notify.Failure(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  const optimisticAction = addPost(post);
  dispatch(optimisticAction);
  dispatch({ type: REQUEST, payload: true });
  try {
    var { data } = await api.createPost(post);
    dispatch({ type: UPDATE_ID, payload: { ...data, newId: post.newId } });
    Notify.Success("Post created..");
  } catch (error) {
    dispatch(undo(optimisticAction));
    console.log(error.message);
    Notify.Failure(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST, payload: true });
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
    Notify.Failure(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  const optimisticAction = remove(id);
  dispatch(optimisticAction);
  try {
    await api.deletePost(id);
  } catch (error) {
    console.log(error);
    dispatch(undo(optimisticAction));
    Notify.Failure(error.message);
  }
};

export const changeLike = (id, isLikeByMe) => async (dispatch, getState) => {
  const optimisticAction = changeLikeCount(id, getState, isLikeByMe);
  dispatch(optimisticAction);
  try {
    if (!isLikeByMe) {
      await api.likePost(id);
    } else {
      await api.unlikePost(id);
    }
  } catch (error) {
    dispatch(undo(optimisticAction));
    const { response } = error;
    const { request, ...errorObject } = response; // take everything but 'request'

    if (error.response) {
      // client received an error response (5xx, 4xx)
      Notify.Failure(response.data.message);
    } else if (error.request) {
      // client never received a response, or request never left
      Notify.Failure(error.message);
    } else {
      // anything else
      Notify.Failure(error.message);
    }
  }
};
