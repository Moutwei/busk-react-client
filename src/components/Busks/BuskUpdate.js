import React, { useState, useEffect, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Busks from '../Busks/Busks.js'
import LocationMap from './LocationMap.js'

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
      <div className='row busk-info'>
        <div className='col-6'>
          <form onSubmit={handleSubmit}>
            <h5 className='cool-h5'>Title</h5>
            <input
              placeholder="new Title..."
              value={busk.title}
              name="title"
              onChange={handleChange}
              className="form-control"
            />
            <p></p>
            <h5 className='cool-h5'>Description</h5>
            <input
              placeholder="new Description..."
              value={busk.description}
              name="description"
              onChange={handleChange}
              className="form-control big"
            />
            <p>Suggestion: Who/What/When/Where/Why</p>
            <h5 className='cool-h5'>Category</h5>
            <input
              placeholder="new Category..."
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
          <p className='update-help'>Find a new location in the map search bar,
            <br />or drag the map and pin point your new location!
          </p>
        </div>
      </div>
    </Fragment>
  )
}

export default withRouter(BuskUpdate)
