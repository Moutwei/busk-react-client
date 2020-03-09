import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Address = props => {
  const [geoAddress, setGeoAddress] = useState(null)
  useEffect(() => {
    axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${props.long},${props.lat}.json?access_token=${process.env.TOKEN}`)
      .then(res => setGeoAddress(res.data.features[0].place_name))
      .catch(console.error)
  }, [])
  return (
    <p>{geoAddress}</p>
  )
}

export default Address
