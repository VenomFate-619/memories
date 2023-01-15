import { combineReducers } from "redux";
import { undoable } from "redux-undo-action";

import posts from "./post";
import auth from "./auth";

export const reducers = combineReducers({ posts: undoable(posts), auth });
