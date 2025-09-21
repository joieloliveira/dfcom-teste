import React from 'react';
import "./App.css"
import { BrowserRouter as Router } from 'react-router-dom';

import RoutesAdm from './routes/routesAdm';

import history from './services/history';

import { AllContextProvider } from './Context';

function App() {
  return (
    <div>
      <AllContextProvider>
        <Router history={history}>
          <RoutesAdm />
        </Router>
      </AllContextProvider>
    </div >
  );
}

export default App;
