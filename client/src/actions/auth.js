import { AUTH , REQUEST_AUTH ,GOOGLE_AUTH } from '../constant/actionTypes';
import { Notify } from "notiflix";
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({type:REQUEST_AUTH,payload:true});
    dispatch({ type: AUTH, payload:data });

    router.push('/');
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
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({type:"REQUEST_AUTH",payload:true});
    dispatch({ type: AUTH, payload : data });

    router.push('/');
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
};

export const googleLogin= (formData,router) => async(dispatch)=> {
 try {
    const { data } = await api.googleLogin(formData)
    dispatch({type:"REQUEST_AUTH",payload:true});

    dispatch({ type: AUTH, payload : data } );

    router.push('/');

  } catch (error) {
    console.log(error);
    if (error?.response) {
      // client received an error response (5xx, 4xx)
      Notify.Failure(error.response.data.message);
    } else if (error?.request) {
      // client never received a response, or request never left
      Notify.Failure(error.message);
    } else {
      // anything else
      Notify.Failure(error.message);
    }
    
  }


}
