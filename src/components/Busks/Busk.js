import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'
import { withRouter } from 'react-router-dom'

const Busk = props => {
  const [busk, setBusk] = useState(null)

  useEffect(() => {
  // GET request by defaut
  // ${props.match.params.id}
    axios(`${apiUrl}/busks/${props.match.params.id}`)
      .then(res => setBusk(res.data.busk))
      .catch(console.error)
      // if I pass busk it will infinitely loop useEffect
      // passing in the ID will only run useEffect when the id is changed!
      // do not pass in state it will loop forever
  }, [props.match.params.id])

  if (busk === null) {
    return <p> Loading... </p>
  }

  return (
    <div>
      <h1>{busk.title}</h1>
      <h4>{busk.description}</h4>
    </div>
  )
}

export default withRouter(Busk)
