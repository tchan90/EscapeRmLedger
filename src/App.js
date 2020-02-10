import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {Provider} from 'react-redux';
import {store,persistor} from './store';
import {PersistGate} from 'redux-persist/integration/react'

import Landing from './components/pages/Landing';
import AllCompanies from './components/pages/AllCompanies';
import DetailRm from './components/pages/DetailRm';
import Admin from './components/pages/Admin';
import AddCompany from './components/pages/companyOps/AddCompany';
import AddRoom from './components/pages/roomOps/AddRoom';
import EditCompany from './components/pages/companyOps/EditCompany';
import EditRoom from './components/pages/roomOps/EditRoom';
import ErrorPage from './components/pages/error/404';
import AddImg from './components/pages/companyOps/AddImage';

function App() {
  return (
    <Provider store={store}>
    <Router> 
      <PersistGate persistor={persistor}> 
    <div className="App">
      <Switch> 
      <Route exact path="/" component={Landing}/>
      <Route exact path="/allCompanies" component={AllCompanies}/>
      <Route exact path="/escapeRm" component={DetailRm}/>
      <Route exact path="/admin" component={Admin}/>
      <Route exact path="/addCompany" component={AddCompany}/>
      <Route exact path="/addRoom/:id" component={AddRoom}/>
      <Route exact path="/editCompany/:id" component={EditCompany}/>
      <Route exact path="/editRoom/:id/:roomId" component={EditRoom}/>
      <Route exact path="/addImg/:id" component={AddImg}/>
      <Route exact path="*" component={ErrorPage}/>
      </Switch>
    </div>
    </PersistGate>
    </Router>
    </Provider>
  );
}

export default App;
