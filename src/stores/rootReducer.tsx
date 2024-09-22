import { combineReducers } from '@reduxjs/toolkit';

import tagsViewReducer from './tags-view.store';
import userReducer from './user.store';

const rootReducer = combineReducers({
  user: userReducer,
  tagsView: tagsViewReducer,
});

export default rootReducer;
