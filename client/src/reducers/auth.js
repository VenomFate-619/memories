import { AUTH,LOGOUT , REQUEST_AUTH , GOOGLE_AUTH } from '../constant/actionTypes'


const initialUser = {
    authData:null,
    loading:false,
    googleLoading:false
};

export default ( user=initialUser , action) => {
  switch (action.type) {
    case AUTH:
        localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
        return { ...user, authData: action.payload, loading: false };
    case LOGOUT :
        localStorage.clear();

      return { ...user, authData: null, loading: false };
    case REQUEST_AUTH:
      return { ...user,loading:action.payload}
    default :
    return user;

  }
};