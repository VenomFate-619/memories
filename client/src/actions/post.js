import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE ,REQUEST,DONE } from    '../constant/actionTypes'      ;
import {  Notify } from 'notiflix'
import * as api from "../api";

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
  try {
    dispatch({type:REQUEST,payload:true})
    var { data } = await api.createPost(post)
    dispatch({type: CREATE ,payload: data})
    Notify.Success("Post created..");
  } catch (error) {
    console.log(error.message);
    Notify.Failure(error.message);
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    dispatch({type:REQUEST,payload:true})

    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
    Notify.Failure(error.message);
  }
};

export const deletePost = (id) => async (dispatch) =>{
  try {
    
    await api.deletePost(id);
    dispatch({type:DELETE , payload: id});
  } catch (error) {
    console.log(error);
    Notify.Failure(error.message);
  }
}

export const likePost = (id) => async (dispatch) =>{
  try {
    
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
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
}
