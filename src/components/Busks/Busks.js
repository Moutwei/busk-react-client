import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'
import ListGroup from 'react-bootstrap/ListGroup'

const Busks = props => {
  const [busks, setBusks] = useState([])

  useEffect(() => {
  // GET request by defaut
    axios(`${apiUrl}/busks`)
      .then(res => { setBusks(res.data.busks) })
      .then(() => props.alert({ heading: 'Loaded', message: 'Here', variant: 'success' }))
      .catch(console.error)
  }, [])

  const busksJsx = busks.map(busk => (
  // <Link to={`/busks/${busk._id}`} key={busk._id} className='list-group-item'>{busk.title}</Link>
    <ListGroup.Item key={busk._id} as={'a'} href={`#/busks/${busk._id}`}>
      {busk.title}
    </ListGroup.Item>
  ))
  return (
    <div>
      <h1>BUSKS YO</h1>
      <ListGroup>
        {busksJsx}
      </ListGroup>
    </div>
  )
}

export default Busks
