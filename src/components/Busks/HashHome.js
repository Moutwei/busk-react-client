import React from 'react'
import YouTube from 'react-youtube'

const HashHome = props => {
  const opts = {
    height: '600',
    width: '100%',
    playerVars: {
      autoplay: 0
    }
  }

  const videoOnReady = (event) => {
    event.target.pauseVideo()
  }

  return (
    <div>
      <h1 className='fancy-h1'>Busk of the Week</h1>
      <YouTube
        videoId="alATtB092eE"
        opts={opts}
        onReady={videoOnReady}
      />
    </div>
  )
}

export default HashHome
