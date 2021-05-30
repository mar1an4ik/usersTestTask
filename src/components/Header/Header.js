import { withRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import "./header.scss";
import { getCurrentTime } from "../../utils";
import { markedUsersSelector } from "../../selectors";

const Header = props => {
  const { markedUsers } = props;
  const [time, setTime] = useState("");

  useEffect(() => {
    setCurrentTime();
    const interval = setInterval(() => {
      setCurrentTime();
    }, 250);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const setCurrentTime = () => {
    setTime(getCurrentTime());
  };

  const goBack = () => {
    props.history.push("/");
  };

  return (
    <nav>
      <div className="navbar-nav">
        <ul className="navbar-ul mr-auto">
          <li className="nav-item nav-time"> Current Time : {time} </li>
          <li className="nav-item nav-marked"> Marked users : {markedUsers.length} </li>
          {window.location.hash !== "#/" &&
          <li onClick={goBack} className="nav-item nav-back"> Open all users </li>
          }
        </ul>
      </div>
    </nav>
  )
};

let mapStateToProps = state => {
  return {
    markedUsers: markedUsersSelector(state)
  }
};

export default withRouter(connect(mapStateToProps, null)(Header));
