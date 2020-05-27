import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import Home from "./pages/Home"

function App() {
	return (
		<div className="App">
			<main>
        <p>just readme</p>
        <Router>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </main>
		</div>
	);
}

export default App;
