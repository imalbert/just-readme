import React from 'react'

import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom"

import Repos from "./Repos"

const Home = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`/:username`}>
        <Repos />
      </Route>
      <Route path={match.path}>
        Just readme?
      </Route>
    </Switch>
  )
}

export default Home