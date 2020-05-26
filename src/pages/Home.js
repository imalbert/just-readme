import React, { useState } from 'react'

import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
} from "react-router-dom"

import Repos from "./Repos"

const Home = () => {
  const history = useHistory()
  const [username, changeUsername] = useState('')
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`/:username`}>
        <Repos />
      </Route>
      <Route path={match.path}>
        <form onSubmit={(e) => { e.preventDefault(); history.push(`/${username}`) }}>
          <input type="text" value={username} onChange={(evt) => changeUsername(evt.target.value)} />
        </form>
      </Route>
    </Switch>
  )
}

export default Home