import { AUTH,LOGOUT , REQUEST_AUTH } from '../constant/actionTypes'


const initialUser = {
    authData:null,
    loading:false
};

export default ( user=initialUser , action) => {
  switch (action.type) {
    case AUTH:
        console.log(action.payload);
        localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
        return { ...user, authData: action.payload, loading: false, errors: null };
    case LOGOUT :
        localStorage.clear();

      return { ...user, authData: null, loading: false, errors: null };
    case REQUEST_AUTH:
      return { ...user,loading:true}
    default :
    return user;

  }
};