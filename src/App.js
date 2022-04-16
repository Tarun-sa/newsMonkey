
import './App.css';

import React, { useState } from 'react';
import NavBar from './components/NavBar';
import News   from './components/News';
import {BrowserRouter as Router,Switch, Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


const  App=()=> {

const [progress, setProgress] = useState(0);

const pageSize=6;
const apiKei="1feb8462a1ad415f95a80dd155c0b1c8"

    return (
      <div>
      {}
      <Router>
       <NavBar />
        <LoadingBar
        color='#f11946'
        progress={progress}
      />
       <Switch>
          <Route exact path="/general">
            <News setProgress={setProgress} api={apiKei} key="general" pageSize={pageSize} country='in' category='general'/>
          </Route>
          <Route exact path="/business">
            <News setProgress={setProgress} api={apiKei}  key="business" pageSize={pageSize} country='in' category='business'/>
          </Route>
           <Route exact path="/entertainment">
            <News setProgress={setProgress} api={apiKei}   key="entertainment" pageSize={pageSize} country='in' category='entertainment'/>
          </Route> 
           <Route exact path="/health">
            <News setProgress={setProgress} api={apiKei}   key="health" pageSize={pageSize} country='in' category='health'/>
          </Route>
            <Route exact path="/sports">
            <News setProgress={setProgress} api={apiKei}   key="sports" pageSize={pageSize} country='in' category='sports'/>
          </Route>
            <Route exact path="/technology">
            <News setProgress={setProgress} api={apiKei}    key="technology" pageSize={pageSize} country='in' category='technology'/>
          </Route>
          <Route exact path="/science">
            <News setProgress={setProgress} api={apiKei}  key="science" pageSize={pageSize} country='in' category='science'/>
          </Route>
        </Switch>
       </Router>
      </div>
    )
}
export default App;