import { createSelector } from "reselect";

 const allUsersSelector = state => state.usersBranch.users;


 const markedUsersSelector = createSelector(
   allUsersSelector,
  (users) => users.filter(user => user.marked === true)
);


const getCurrentUserSelector = (state, id) => state.usersBranch.users.find(user => user.login.uuid === id)



export {
  allUsersSelector,
  markedUsersSelector,
  getCurrentUserSelector
};