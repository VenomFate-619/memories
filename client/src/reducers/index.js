import { combineReducers } from "redux";

import posts from "./post";
import auth from './auth'


export const reducers = combineReducers({ posts , auth });
