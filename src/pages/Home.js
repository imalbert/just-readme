import React, { useState, useEffect, useRef } from 'react'

import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
} from "react-router-dom"

import Repos from "./Repos"

const Home = () => {
  const inputEl = useRef(null)
  const history = useHistory()
  const [username, changeUsername] = useState('')
  const match = useRouteMatch();

  useEffect(() => {
    inputEl.current.focus()
  }, [inputEl])

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
            type="text"
            ref={inputEl}
            data-testid="gh-username-input"
            placeholder="Input GitHub username then press Enter"
            style={{ width: '320px', padding: '5px' }}
            value={username} onChange={(evt) => changeUsername(evt.target.value)}
          />
        </form>
      </Route>
    </Switch>
  )
}

export default Home