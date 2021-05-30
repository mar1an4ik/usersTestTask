import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./marked_users.scss";
import { markUser, unMarkUser } from "../../actions";
import { markedUsersSelector } from "../../selectors";
import { renderMarkButton } from "../../utils";

const MarkedUsers = props => {
  const {
    markedUsers,
    markUser,
    unMarkUser
  } = props;


  const [filterUserFirstName, setFilterUserFirstName] = useState("");
  const [filterUserLastName, setFilterUserLastName] = useState("");
  const [showFilteredPosts, setShowFilteredPosts] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([])


  const openUserDetails = user => {
    props.history.push(`user/${user.login.uuid}`)
  };

  const renderPost = post => {

    return (
      <div className="card mb-3" onClick={() => openUserDetails(post)} key={post.login.uuid}>
        <img className="card-image" src={post.picture.large} alt="Post image"/>
        <div className="card-body">
          <h5 className="card-title">{post.name.first + " " + post.name.last}</h5>
          {renderMarkButton(post, markUser, unMarkUser)}
        </div>
        <h6 className="card-id">{post.login.uuid}</h6>
      </div>
    )
  };

  const filterPosts = (event, type) => {
    event.preventDefault();
    if (event.target.value === "") {
      setShowFilteredPosts(false);
      setFilteredPosts([]);
      setFilterUserFirstName(event.target.value);
      setFilterUserLastName(event.target.value);
      return;
    }

    switch (type) {
      case "first":
        setFilterUserFirstName(event.target.value);
        let filteredByFirstName = markedUsers.filter(post => post.name.first.includes(event.target.value));
        setFilteredPosts(filteredByFirstName);
        setShowFilteredPosts(true);
        break;
      case "last":
        setFilterUserLastName(event.target.value);
        let filteredByLastName = markedUsers.filter(post => post.name.last.includes(event.target.value));
        setFilteredPosts(filteredByLastName);
        setShowFilteredPosts(true);
        break;
    }

  };

  const renderInputFilter = type => {
    let value;
    if (type === "first") value = filterUserFirstName;
    if (type === "last") value = filterUserLastName;

    return (
      <nav className="navbar">
        <form className="form-inline">
          <input value={value}
                 onChange={(event) => filterPosts(event, type)}
                 className="form-control mr-sm-2"
                 placeholder={`Enter ${type} name`}
                 onFocus={() => {
                   setShowFilteredPosts(false);
                   setFilteredPosts([]);
                   type === "first" && setFilterUserLastName("");
                   type === "last" && setFilterUserFirstName("");
                 }} //disable multiple filter
          />
        </form>
      </nav>
    )
  };

  const renderFilteredPosts = () => {
    return filteredPosts?.length
      ? filteredPosts.map(renderPost)
      : <div className="no-filtered"> No posts by user with this id </div>
  };

  const renderAllPosts = () => {
    return markedUsers?.length
      ? markedUsers.map(renderPost)
      : <div className="loading"><h4>No marked users</h4></div>
  };

  return (
    <div className="marked-page">
      {renderInputFilter("first")}
      {renderInputFilter("last")}
      <div className="row">
        {
          showFilteredPosts ? renderFilteredPosts() : renderAllPosts()
        }
      </div>
    </div>
  )
};

let mapStateToProps = state => {
  return {
    markedUsers: markedUsersSelector(state)
  }
};

const mapDispatchToProps = {
  markUser,
  unMarkUser
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MarkedUsers));
