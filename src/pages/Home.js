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
        <form
          data-testid="gh-username-form"
          onSubmit={(e) => { e.preventDefault(); history.push(`/${username}`) }}>
          <input
            data-testid="gh-username-input"
            type="text"
            placeholder="Github username"
            value={username} onChange={(evt) => changeUsername(evt.target.value)}
          />
        </form>
      </Route>
    </Switch>
  )
}

export default Home