import React from 'react';
import {CheckAuth} from "./components/CheckAuth";
import {Profile} from "./components/Profile";


function App() {
  return (
    <div className="App">
        <CheckAuth isAuth={false}>
            <Profile />
        </CheckAuth>
    </div>
  );
}

export default App;
