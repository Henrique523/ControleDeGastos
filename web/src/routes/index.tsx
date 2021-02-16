import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Category from '../pages/Category'
import Cost from '../pages/Cost'

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/category" component={Category} />
    <Route path="/cost" component={Cost} />
  </Switch>
)

export default Routes
