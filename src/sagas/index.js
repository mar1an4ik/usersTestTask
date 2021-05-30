import {all} from "redux-saga/effects"

import { mySaga } from "./UsersSaga";

export function* rootWatcher() {
  yield all([mySaga()])
}