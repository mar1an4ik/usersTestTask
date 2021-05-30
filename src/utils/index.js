import React from "react";
import Loader from "react-loader-spinner";

export const renderLoader = () => {
  return <Loader type="Audio" height={100} width={100} visible/>
};

export const getCurrentTime = () => {
  let today = new Date();
  return today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
};

export const renderMarkButton = (user, markUser, unMarkUser) => {
  return user.marked
    ?
    <div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          unMarkUser(user);
        }}
        className="btn btn-primary"
      >
        Unmark
      </button>
      <div>
        Was marked: {user.markedTime}
      </div>
    </div>
    :
    <button
      onClick={(e) => {
        e.stopPropagation();
        markUser(user, getCurrentTime());
      }}
      className="btn btn-primary"
    >
      Mark
    </button>
};
