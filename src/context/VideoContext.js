import React from 'react'

const VideoContext = React.createContext({
  SavedVideosList: [],
  saveVideos: () => {},
})

export default VideoContext
