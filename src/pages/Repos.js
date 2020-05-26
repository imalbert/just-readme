import React, { useState, useEffect } from 'react'

import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom"

import Readme from "./Readme"
import Loading from "../components/Loading"
import { getRepos } from "../api/github"


const Repos = () => {
  const [repos, setRepos] = useState(null)
  const match = useRouteMatch();
  const params = useParams()

  useEffect(() => {
    async function getGithubRepos (username) {
      setRepos(await getRepos(username))
    }

    getGithubRepos(params.username)
  }, [params.username])

  if (repos === null) {
    return <Loading title="Repos"/>
  }

  if (repos.length === 0) {
    return <p>{params.username} has no repos</p>
  }

  return (
    <Switch>
      <Route path={`${match.path}/:project`}>
        <Readme />
      </Route>
      <Route path={match.path}>
        <h1>{params.username} - Repositories</h1>
        {repos === null
          ? <Loading title="Repos"/>
          : repos.length === 0
            ? <p>{params.username} has no repos</p>
            : (
              <ol>
                {repos.map(repo => (
                  <li key={repo.id}>
                    <Link to={`${match.url}/${repo.name}`}>
                      {repo.name}
                    </Link>
                  </li>
                ))}
              </ol>
            )
        }
      </Route>
    </Switch>
  )
}

export default Repos