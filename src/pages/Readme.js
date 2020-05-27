import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import MarkdownIt from 'markdown-it'

import Loading from "../components/Loading"
import { getReadme } from "../api/github"

const md = MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

const Readme = () => {
  const [projectReadme, setProjectReadme] = useState()
  const { username, project } = useParams()

  useEffect(() => {
    async function getGithubProject(username, project) {
      setProjectReadme(await getReadme(username, project))
    }

    getGithubProject(username, project)
  }, [username, project])

  return (
    <>
      <h1>{username}/{project} README</h1>
      {!projectReadme
        ? <Loading title="Project" />
        : projectReadme.message === "Not Found"
          ? <i>No README was provided for this project.</i>
          : <article dangerouslySetInnerHTML={{ __html: md.render(projectReadme) }} />
      }
    </>
  )
}

export default Readme