import React from 'react';
import 'bulma/css/bulma.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import { CreateHero } from './pages/CreateHero';
import { Heroes } from './pages/Heroes';
import { Hero } from './pages/Hero';
import { SagaTest } from './pages/SagaTest';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={CreateHero} />
          <Route path="/hero/:hero_id" component={Hero} />
          <Route path="/heroes" component={Heroes} />
          <Route path="/saga_test" component={SagaTest} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
