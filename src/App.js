import React from "react";
import { Provider } from "react-redux";
import { Route, Switch, HashRouter, useHistory } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react'

import './app.scss';
import { persistor, store } from "./store/store";


import { Footer, Header } from "./components";
import { NotFoundPage, TabsPanel, UserInfo } from "./screens";



const App = () => {
  const history = useHistory();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter history={history}>
          <Header/>

          <div className="main-div">
            <Switch>
              <Route exact path={["/", "/edit/:id", "/create"]} component={TabsPanel}/>
              <Route path="/user/:id" component={UserInfo}/>
              <Route path="*" component={NotFoundPage}/>
            </Switch>
          </div>

          <Footer/>
        </HashRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
