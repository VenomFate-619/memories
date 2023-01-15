import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE,REQUEST,DONE } from '../constant/actionTypes'

const initialPosts = {
  loading:false,
  posts:null
}


export default  function PostReducer(posts = initialPosts, { type, payload }) {
  switch (type) {
    case FETCH_ALL:
      return {...posts,posts:payload};
    case CREATE:
      return {...posts, posts : [...posts.posts,payload] ,loading:false };
    case UPDATE:
    case LIKE:
      return {...posts , posts :  posts.posts.map((post) => (post._id === payload._id ? payload : post)) ,   loading:false}; 
    case DELETE:
      return {...posts , posts: posts.posts.filter((post) => post._id !== payload)};
    case REQUEST :
      return { ...posts , loading: payload }
    case DONE:
      return  {...posts , loading: payload }
    default:
      return posts;
  }
};
