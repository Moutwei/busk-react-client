import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'
import ListGroup from 'react-bootstrap/ListGroup'
import { withRouter } from 'react-router-dom'
import Address from './Address.js'

const Busks = props => {
  const [busks, setBusks] = useState([])

  useEffect(() => {
  // GET request by defaut
    axios(`${apiUrl}/busks`)
      .then(res => { setBusks(res.data.busks) })
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
      <div className='row'>
        <div className='col-3'>
          <p>{busk.owner.email} </p>
        </div>
        <div className='col-9'>
          <h5>{busk.title}</h5>
          <Address long={busk.longitude} lat={busk.latitude}/>
          {sayEdited(busk._id)}
        </div>
      </div>
    </ListGroup.Item>
  ))

  if (busks === null) {
    return <h1 className='fancy-h1'> Loading Busks... </h1>
  }

  return (
    <div>
      <h1 className="fancy-h1">Busks</h1>
      <ListGroup>
        {busksJsx}
      </ListGroup>
    </div>
  )
}

export default withRouter(Busks)
