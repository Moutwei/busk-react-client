import React, { useState } from 'react'
import apiUrl from '../../apiConfig.js'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import LocationMap from './LocationMap.js'

const BuskCreate = props => {
  const [busk, setBusk] = useState({ title: '', description: '', longitude: '', latitude: '', category: '' })

  const handleChange = event => {
    event.persist()
    setBusk(busk => ({ ...busk, [event.target.name]: event.target.value }))
  }
  const handleLongitudeChange = value => {
    console.log('value', value)
    setBusk(busk => ({ ...busk, 'longitude': value }))
  }
  const handleLatitudeChange = value => {
    console.log('value', value)
    setBusk(busk => ({ ...busk, 'latitude': value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/busks`,
      method: 'POST',
      data: { busk },
      headers: { Authorization: `Bearer ${props.user.token}` }
    })
      // .then(res => setCreatedBookId(res.data.busk._id))
      // another way to re route to another url
      .then(res => props.history.push(`/busks/${res.data.busk._id}`))
      .then(() => props.alert({ heading: 'Created Busk', message: 'Successful', variant: 'success' }))
      .catch(console.error)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input
        placeholder="Title..."
        value={busk.title}
        name="title"
        onChange={handleChange}
      />

      <label>Description</label>
      <input
        placeholder="Description..."
        value={busk.description}
        name="description"
        onChange={handleChange}
      />

      <label>Longitude</label>
      <input
        placeholder="Longitude..."
        value={busk.longitude}
        name="longitude"
        onChange={handleChange}
      />

      <label>Latitude</label>
      <input
        placeholder="Latitude..."
        value={busk.latitude}
        name="latitude"
        onChange={handleChange}
      />

      <label>Category</label>
      <input
        placeholder="Category..."
        value={busk.category}
        name="category"
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
      <LocationMap
        handleLongitudeChange={handleLongitudeChange}
        handleLatitudeChange={handleLatitudeChange}
      />
    </form>
  )
}

export default withRouter(BuskCreate)
