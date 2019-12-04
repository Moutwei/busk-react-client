import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'
import ListGroup from 'react-bootstrap/ListGroup'
import { withRouter } from 'react-router-dom'

const Busks = props => {
  const [busks, setBusks] = useState([])

  useEffect(() => {
  // GET request by defaut
    axios(`${apiUrl}/busks`)
      .then(res => { setBusks(res.data.busks) })
      .then(() => props.alert({ heading: 'Busks', message: 'Loaded Successfully', variant: 'success' }))
      .catch(console.error)
  }, [])

  // can style to time out like green or something
  const sayEdited = (id) => {
    if (id === props.updatedId) {
      return <span> EDITED </span>
    }
  }

  const busksJsx = busks.map(busk => (
  // <Link to={`/busks/${busk._id}`} key={busk._id} className='list-group-item'>{busk.title}</Link>
    <ListGroup.Item key={busk._id} as={'a'} href={`#/busks/${busk._id}`}>
      <h4>{busk.title}</h4>
      <span> posted by: {busk.owner.email} </span>
      <p> longitude: {busk.longitude} latitude: {busk.latitude}</p>
      {sayEdited(busk._id)}
    </ListGroup.Item>
  ))
  return (
    <div>
      <h1>BUSKS</h1>
      <ListGroup>
        {busksJsx}
      </ListGroup>
    </div>
  )
}

export default withRouter(Busks)
