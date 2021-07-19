//import React from 'react';

import React, {Component} from "react";
import background from "./images/demonSlayer.jpg";

/*
function App() {
  return (
    <div className="App">
      AYAYA
    </div>
  );
}
*/


class App extends Component<{}> {
  render() {
    return (
      <div className="App" style={{backgroundImage: `url(${background})`}}>
        <p>Hello.</p>

      </div>
    );
  }
}

export default App;
