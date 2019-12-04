import React, { useState, useEffect, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Busk from './Busk.js'
import Busks from '../Busks/Busks.js'

import apiUrl from '../../apiConfig'

const BuskUpdate = props => {
  const [busk, setBusk] = useState({ title: '', description: '', longitude: '', latitude: '', category: '' })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/busks/${props.match.params.id}`)
      .then(res => setBusk(res.data.busk))
      .catch(console.error)
  }, [])

  const handleChange = event => {
    event.persist()
    setBusk(busk => ({ ...busk, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/busks/${props.match.params.id}`,
      method: 'PATCH',
      data: { busk },
      headers: { Authorization: `Bearer ${props.user.token}` }
    })
      .then(() => setUpdated(true))
      .catch(console.error)
  }

  if (updated) {
    return <Busks alert={props.alert} user={props.user} updatedId={props.match.params.id}/>
  }
  return (
    <Fragment>
      <h2> UPDATE... </h2>
      <Busk user={props.user}/>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          placeholder="new Title..."
          value={busk.title}
          name="title"
          onChange={handleChange}
        />

        <label>Description</label>
        <input
          placeholder="new Description..."
          value={busk.description}
          name="description"
          onChange={handleChange}
        />

        <label>Longitude</label>
        <input
          placeholder="new Longitude..."
          value={busk.longitude}
          name="longitude"
          onChange={handleChange}
        />

        <label>Latitude</label>
        <input
          placeholder="new Latitude..."
          value={busk.latitude}
          name="latitude"
          onChange={handleChange}
        />

        <label>Category</label>
        <input
          placeholder="new Category..."
          value={busk.category}
          name="category"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </Fragment>
  )
}

export default withRouter(BuskUpdate)
