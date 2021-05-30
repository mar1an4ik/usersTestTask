import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./users.scss";
import { fetchAllUsers, markUser, unMarkUser } from "../../actions";
import { renderLoader, renderMarkButton } from "../../utils";
import { allUsersSelector, markedUsersSelector } from "../../selectors";

const Users = props => {
  const {
    markUser,
    unMarkUser,
    fetchAllUsers,
    allUsers
  } = props;

  const perPage = 20;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [filterUserFirstName, setFilterUserFirstName] = useState("");
  const [filterUserLastName, setFilterUserLastName] = useState("");
  const [showFilteredPosts, setShowFilteredPosts] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const getUserList = () => {
    setLoading(true);
    fetchAllUsers(page, perPage);
    setPage(page + 1)
    setLoading(false);
  };

  useEffect(() => {
    !allUsers.length && getUserList();
  }, []);

  const loadMore = () => {
    getUserList();
    setPage(page + 1);
  };

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
        const filteredByFirstName = allUsers.filter(post => post.name.first.toLowerCase().includes(event.target.value.toLowerCase()));
        setFilteredPosts(filteredByFirstName);
        setShowFilteredPosts(true);
        break;
      case "last":
        setFilterUserLastName(event.target.value);
        const filteredByLastName = allUsers.filter(post => post.name.last.toLowerCase().includes(event.target.value.toLowerCase()));
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
    return allUsers?.length
      ? allUsers.map(renderPost)
      : renderLoader()
  };

  return (
    <div className="posts-page">
      {renderInputFilter("first")}
      {renderInputFilter("last")}
      <div className="row">
        {
          showFilteredPosts ? renderFilteredPosts() : renderAllPosts()
        }
      </div>
      <div className="btn-load-more">
        <button className="btn-primary m-3" onClick={loadMore}>
          {loading ? renderLoader() : 'Load More'}
        </button>
      </div>
    </div>
  )
};

let mapStateToProps = state => {
  return {
    allUsers: allUsersSelector(state),
    markedUsers: markedUsersSelector(state)
  }
};

const mapDispatchToProps = {
  markUser,
  unMarkUser,
  fetchAllUsers
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users));
