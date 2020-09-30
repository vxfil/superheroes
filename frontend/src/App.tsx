import React from 'react';
import 'bulma/css/bulma.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import { CreateHero } from './pages/CreateHero/CreateHero';
import { Heroes } from './pages/Heroes';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={CreateHero} />
          <Route path="/heroes" component={Heroes} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
