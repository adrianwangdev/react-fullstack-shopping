import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Users/login'

/* HOC */
import MainLayout from './hoc/mainLayout'

const Routes = () => (
  <BrowserRouter>
    <MainLayout>
      <Switch>
        <Route path='/login' component={ Login } />
        <Route path='/' component={ Home } />
      </Switch>
    </MainLayout>
  </BrowserRouter>
)

export default Routes
