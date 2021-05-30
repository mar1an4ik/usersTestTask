import { handleActions } from 'redux-actions';

import {
  initAllUsers,
  markUser,
  unMarkUser
} from "../actions";

const defaultState = {
  users: [],
};

export const UsersReducer = handleActions(
  {
    [initAllUsers]: (state, { payload: { users } }) => {
      let statecopy = { ...state };
      statecopy.users = [...state.users];
      users.map((user) => {
        statecopy.users.push(user);
      });

      return statecopy;
    },

    [markUser]: (state, { payload: { user, time } }) => {
      let statecopy = { ...state };
      statecopy.users = [...state.users];
      let searchedUser = statecopy.users.find((element) => element.login.uuid === user.login.uuid);
      searchedUser.marked = true;
      searchedUser.markedTime = time;

      return statecopy;
    },

    [unMarkUser]: (state, { payload: { user } }) => {
      let statecopy = { ...state };
      statecopy.users = [...state.users];
      let searchedUser = statecopy.users.find((element) => element.login.uuid === user.login.uuid);
      searchedUser.marked = false;
      searchedUser.markedTime = null;

      return statecopy;
    }
  }, defaultState
);
