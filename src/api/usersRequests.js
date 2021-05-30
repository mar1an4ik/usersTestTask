import axios from "axios";

const handleFetchUsersRequest = (page, perPage) => {
  try {
    return axios.get(`https://randomuser.me/api/?page=${page}&results=${perPage}&seed=abc`)
  } catch (error) {
    alert("error" + error);
    return null;
  }
};

export {
  handleFetchUsersRequest
};
