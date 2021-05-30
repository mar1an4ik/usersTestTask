import { call, put, takeEvery } from 'redux-saga/effects'

import { handleFetchUsersRequest } from "../api";
import { fetchAllUsers, initAllUsers } from "../actions";

function* fetchUsersWorker(action) {
  try {
    const user = yield call(handleFetchUsersRequest, action.payload.page, action.payload.perPage);
    yield put(initAllUsers(user.data.results));
  } catch (e) {
    alert("api error")
  }
}

export function* mySaga() {
  yield takeEvery(fetchAllUsers, fetchUsersWorker);
}
