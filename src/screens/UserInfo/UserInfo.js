import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import "./user_info.scss"
import { renderMarkButton } from "../../utils";
import { markUser, unMarkUser } from "../../actions";
import { allUsersSelector, getCurrentUserSelector } from "../../selectors";

const UserInfo = props => {
  const {
    currentUser,
    markUser,
    unMarkUser
  } = props;

  return (
    <div>
      {currentUser?.name
        ? <div className="card mb-3 post-info" key={currentUser.email}>
          <div className="card-body">
            <img src={currentUser.picture.large} alt="Post image"/>
            <h5>Name : {currentUser.name.first + " " + currentUser.name.last}</h5>
            <h5>Email : {currentUser.email}</h5>
            <h5>Location : {currentUser.location.city + currentUser.location.state}</h5>
            <h5>Adress : {currentUser.location.street.name + currentUser.location.street.number}</h5>
            <h5>Gender : {currentUser.gender}</h5>
            <h5>Birthday : {currentUser.dob.date}</h5>
            <h5>Phone : {currentUser.phone}</h5>
            {renderMarkButton(currentUser, markUser, unMarkUser)}
          </div>
          <h6 className="card-id">{currentUser.login.uuid}</h6>
        </div>
        : <Redirect to={"/"}/>
      }
    </div>
  )
};

let mapStateToProps = (state, props) => {
  return {
    allUsers: allUsersSelector(state),
    currentUser: getCurrentUserSelector(state, props.match.params.id)
  }
};

const mapDispatchToProps = {
  markUser,
  unMarkUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
