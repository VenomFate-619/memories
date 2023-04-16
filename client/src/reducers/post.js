import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE,REQUEST,DONE,UPDATE_ID } from '../constant/actionTypes'

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
    case UPDATE_ID:
      return {
        ...posts,
        posts: posts.posts.map((post) =>
          post.newId === payload.newId ? payload : post
        ),
        loading: false,
      };
    default:
      return posts;
  }
};
