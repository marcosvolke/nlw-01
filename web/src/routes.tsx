import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/home';
import CreatePoint from './pages/CreatePoint';

const Routes = () => {
    return (
        // exact (exact="true") obriga o caminho a ser exatamente aquele, pq o padrão é starts with, então ficaria sempre na home
        <BrowserRouter>
            <Route component={Home} path="/" exact /> 
            <Route component={CreatePoint} path="/create-point" />
        </BrowserRouter>
    );
}

export default Routes;