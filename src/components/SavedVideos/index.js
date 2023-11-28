import {Component} from 'react'
// import Cookies from 'js-cookie'
// import Loader from 'react-loader-spinner'

import {FaPhoenixSquadron} from 'react-icons/fa'

import SideBar from '../SideBar'
import Header from '../Header'
import UserSavedVideos from '../UserSavedVideos'
import VideoContext from '../../context/VideoContext'
import './index.css'

class SavedVideos extends Component {
  render() {
    return (
      <VideoContext.Consumer>
        {value => {
          const {SavedVideosList} = value
          console.log(SavedVideosList)
          return (
            <>
              <Header />
              <div className="home-container">
                <SideBar />
                <div className="trending-videos-con">
                  <div className="trending-videos-text-con">
                    <FaPhoenixSquadron />
                    <p>Trending</p>
                  </div>
                  <ul className="user-saved-videos-con">
                    {SavedVideosList.length === 0 ? (
                      <>
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                          alt="no saved videos"
                          className="no-saved-image"
                        />
                        <h1>No saved videos found</h1>
                        <p>Save your videos by clicking a button</p>
                      </>
                    ) : (
                      SavedVideosList.map(each => (
                        <UserSavedVideos each={each} key={each.id} />
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </>
          )
        }}
      </VideoContext.Consumer>
    )
  }
}

export default SavedVideos
