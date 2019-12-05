import React, { useState, Fragment } from 'react'
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
    // console.log('value', value)
    setBusk(busk => ({ ...busk, 'longitude': value }))
  }
  const handleLatitudeChange = value => {
    // console.log('value', value)
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
    <Fragment>
      <div className='row'>
        <div className='col-6'>
          <form onSubmit={handleSubmit}>
            <h5 className='cool-h5'>Title</h5>
            <p></p>
            <input
              placeholder="Title..."
              value={busk.title}
              name="title"
              onChange={handleChange}
              className="form-control"
            />
            <p></p>
            <h5 className='cool-h5'>Description</h5>
            <p>Suggestion: Who/What/When/Where/Why</p>
            <input
              placeholder="Description..."
              value={busk.description}
              name="description"
              onChange={handleChange}
              className="form-control"
            />
            <p></p>
            <h5 className='cool-h5'>Category</h5>
            <p></p>
            <input
              placeholder="Category..."
              value={busk.category}
              name="category"
              onChange={handleChange}
              className="form-control"
            />
            <button className="btn btn-info" type="submit">Submit</button>
          </form>
        </div>
        <div className='col-5'>
          <LocationMap
            handleLongitudeChange={handleLongitudeChange}
            handleLatitudeChange={handleLatitudeChange}
          />
          <p className='update-help'>Add a new location in the map search bar,
            <br />or drag the map and pin point your location!
          </p>
        </div>
      </div>
    </Fragment>
  )
}

export default withRouter(BuskCreate)
