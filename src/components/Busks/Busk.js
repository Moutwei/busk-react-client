import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'
import { Redirect, withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import LocationMapShow from './LocationMapShow.js'
import Address from './Address.js'

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
      .catch(console.error)
  }

  // checks if signed in && checks if user id's match
  // and gets rid of buttons when updating.
  const showOwnersButtons = () => {
    // console.log(props)
    // console.log(busk)
    if ((props.user !== null) && (props.user._id === busk.owner) && (props.location.pathname !== `/busks/${props.match.params.id}/update-busk`)) {
      return (
        <div className='row'>
          <Button className='col-6' variant='info' busk={busk} href={`#busks/${props.match.params.id}/update-busk`}>Update Busk</Button>
          <Button className='col-6' variant="danger" onClick={destroy} type="submit"> Delete </Button>
        </div>
      )
    }
  }

  if (busk === null) {
    return <h1 className='fancy-h1'> Loading... </h1>
  }

  if (deleted) {
    return <Redirect to={
      { pathname: '/home', state: { msg: 'Busk succesfully deleted!' } }
    } />
  }

  return (
    <div className='busk-info'>
      <div className='row'>
        <div className='col-6'>
          <h1 className='fancy-h1'>{busk.title}</h1>
          <div className='info-section'>
            <h5 className='cool-h5'>Description</h5>
            <p>{busk.description}</p>
            <h5 className='cool-h5'>Category</h5>
            <p>{busk.category}</p>
            <h5 className='cool-h5'>Address</h5>
            <Address long={busk.longitude} lat={busk.latitude}/>
            {showOwnersButtons()}
          </div>
        </div>
        <div className='col-5'>
          <LocationMapShow long={busk.longitude} lat={busk.latitude}/>
          <p className='update-help'>That pokeball is where this event will be!</p>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Busk)
