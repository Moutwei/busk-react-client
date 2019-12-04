import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'
import { Redirect, withRouter } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

const Busk = props => {
  const [busk, setBusk] = useState(null)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
  // GET request by defaut
  // ${props.match.params.id}
    axios(`${apiUrl}/busks/${props.match.params.id}`)
      .then(res => setBusk(res.data.busk))
      .catch(console.error)
      // if I pass busk it will infinitely loop useEffect
      // passing in the ID will only run useEffect when the id is changed!
      // do not pass in state it will loop forever
      // props.user._id === busk.owner && use for NavLink
  }, [props.match.params.id])

  const destroy = () => {
    axios({
      url: `${apiUrl}/busks/${props.match.params.id}`,
      method: 'DELETE',
      headers: { Authorization: `Bearer ${props.user.token}` }
    })
      .then(() => setDeleted(true))
      .then(() => props.alert({ heading: 'DELETED', message: 'Successful!', variant: 'success' }))
      .catch(console.error)
  }

  // checks if signed in && checks if user id's match
  // and gets rid of buttons when updating.
  const showOwnersButtons = () => {
    console.log(props)
    console.log(busk)
    if ((props.user !== null) && (props.user._id === busk.owner) && (props.location.pathname !== `/busks/${props.match.params.id}/update-busk`)) {
      return (
        <div>
          <Nav.Link busk={busk} href={`#busks/${props.match.params.id}/update-busk`}>Update Busk</Nav.Link>
          <Button variant="danger" onClick={destroy} type="submit"> Delete </Button>
        </div>
      )
    }
  }

  if (busk === null) {
    return <p> Loading... </p>
  }

  if (deleted) {
    return <Redirect to={
      { pathname: '/home', state: { msg: 'Busk succesfully deleted!' } }
    } />
  }

  return (
    <div>
      <h1>{busk.title}</h1>
      <h4>Description: {busk.description}</h4>
      <h4>Longitude: {busk.longitude} Latitude {busk.latitude}</h4>
      <h4>Category: {busk.category} </h4>
      {showOwnersButtons()}
    </div>
  )
}

export default withRouter(Busk)
