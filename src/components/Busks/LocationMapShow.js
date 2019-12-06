import 'mapbox-gl/dist/mapbox-gl.css'
import React, { Component, Fragment } from 'react'
import MapGL, { Marker } from 'react-map-gl'
import DeckGL, { GeoJsonLayer } from 'deck.gl'
import { withRouter } from 'react-router-dom'

// Please be a decent human and don't abuse my Mapbox API token.
// If you fork this sandbox, replace my API token with your own.
// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
const MAPBOX_TOKEN =
  'pk.eyJ1IjoicGhyZWVraWVrYW1ibyIsImEiOiJjazNyb3JyNngwYTZuM2VvMHJ1M3NmMnZ2In0.E7o6hpimLdRzfmUDdxT-eA'

class LocationMapShow extends Component {
  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: parseFloat(this.props.lat),
      longitude: parseFloat(this.props.long),
      zoom: 17
    },
    searchResultLayer: null
  }

  mapRef = React.createRef()

  componentDidMount () {
    window.addEventListener('resize', this.resize)
    this.resize()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resize)
  }

  resize = () => {
    this.handleViewportChange({
      width: '40vw',
      height: '40vh'
    })
  }

  handleViewportChange = viewport => {
    // console.log('viewport look', viewport)
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
    if (this.props.handleLatitudeChange !== undefined) {
      this.props.handleLatitudeChange(this.state.viewport.latitude)
      this.props.handleLongitudeChange(this.state.viewport.longitude)
    }
  }

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 }

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    })
  }

  handleOnResult = event => {
    this.setState({
      searchResultLayer: new GeoJsonLayer({
        id: 'search-result',
        data: event.result.geometry,
        getFillColor: [255, 0, 0, 128],
        getRadius: 1000,
        pointRadiusMinPixels: 10,
        pointRadiusMaxPixels: 10
      })
    })
    // console.log('search result layer', this.state.searchResultLayer)
  }
  render () {
    const { viewport, searchResultLayer } = this.state
    // console.log('latitude,', this.state.viewport.latitude)
    // console.log('longitude,', this.state.viewport.longitude)
    // console.log('this.props', this.props)

    return (
      <Fragment>
        <MapGL
          ref={this.mapRef}
          {...viewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          mapStyle={'mapbox://styles/phreekiekambo/ck3sb4yg71mub1cnul6x1txhg'}
          className='map'
        >
          <Marker className='marker' key={this.props.id} longitude={parseFloat(this.props.long)} latitude={parseFloat(this.props.lat)}>
            <img className='show-marker' src="https://i.imgur.com/YoBlqpE.png" alt='map marker'/>
          </Marker>
          <DeckGL {...viewport} layers={[searchResultLayer]} />
        </MapGL>
      </Fragment>
    )
  }
}

export default withRouter(LocationMapShow)
