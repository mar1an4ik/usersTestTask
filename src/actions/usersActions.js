import { createActions } from "redux-actions";

export const { initAllUsers, markUser, fetchAllUsers, unMarkUser } = createActions({
  INIT_ALL_USERS: (users) => ({ users }),
  FETCH_ALL_USERS: (page, perPage) => ({ page, perPage }),
  MARK_USER: (user, time) => ({ user, time }),
  UN_MARK_USER: (user) => ({ user })
});