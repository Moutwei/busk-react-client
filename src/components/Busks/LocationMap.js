import 'mapbox-gl/dist/mapbox-gl.css'
import React, { Component, Fragment } from 'react'
import MapGL from 'react-map-gl'
import DeckGL, { GeoJsonLayer } from 'deck.gl'
import Geocoder from 'react-map-gl-geocoder'
import { withRouter } from 'react-router-dom'

// Please be a decent human and don't abuse my Mapbox API token.
// If you fork this sandbox, replace my API token with your own.
// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens 42.36050000030007
const MAPBOX_TOKEN =
  'pk.eyJ1IjoicGhyZWVraWVrYW1ibyIsImEiOiJjazNyb3JyNngwYTZuM2VvMHJ1M3NmMnZ2In0.E7o6hpimLdRzfmUDdxT-eA'

class LocationMap extends Component {
  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 42.36050000030007,
      longitude: -71.05959915454186,
      zoom: 12
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
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
    if (this.props.handleLatitudeChange !== undefined) {
      this.props.handleLatitudeChange(this.state.viewport.latitude)
      this.props.handleLongitudeChange(this.state.viewport.longitude)
    }
    // if ((this.props.lat && this.props.long) !== undefined) {
    //   this.setState({
    //     viewport: {
    //       latitude: parseFloat(this.props.lat),
    //       longitude: parseFloat(this.props.long)
    //     }
    //   })
    //   console.log('my new state', this.state)
    // }
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
  }
  render () {
    const { viewport, searchResultLayer } = this.state
    console.log('latitude,', this.state.viewport.latitude)
    console.log('longitude,', this.state.viewport.longitude)
    console.log('this.props', this.props)

    return (
      <Fragment>
        <MapGL
          ref={this.mapRef}
          {...viewport}
          onViewportChange={this.handleViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          mapStyle={'mapbox://styles/phreekiekambo/ck3sb4yg71mub1cnul6x1txhg'}
        >
          <Geocoder
            mapRef={this.mapRef}
            onResult={this.handleOnResult}
            onViewportChange={this.handleGeocoderViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            position="top-left"
          />
          <DeckGL {...viewport} layers={[searchResultLayer]} />
        </MapGL>
      </Fragment>
    )
  }
}

export default withRouter(LocationMap)
