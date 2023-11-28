import {BsSearch} from 'react-icons/bs'

import {HiOutlineX} from 'react-icons/hi'

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import Header from '../Header'
import NxtWatchVideos from '../NxtWatchVideos'
import SideBar from '../SideBar'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Home extends Component {
  state = {
    videosList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
  }

  componentDidMount = () => {
    this.getVideos()
  }

  getVideos = async () => {
    const {searchInput} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.status === 200) {
      const data = await response.json()

      const fetchedData = data.videos.map(each => ({
        id: each.id,
        channelName: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))

      this.setState({
        videosList: fetchedData,
        apiStatus: apiStatusConstants.success,
        searchInput: '',
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderVideosList = () => {
    const {videosList} = this.state
    if (videosList.length === 0) {
      return (
        <div className="no-videos-con">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            alt="no videos"
            className="no-videos"
          />
          <h1>No Search results found</h1>
          <p>Try different key words or remove search filter</p>
          <button type="button" className="retry" onClick={this.getVideos}>
            Retry
          </button>
        </div>
      )
    }
    return (
      <ul className="videos-ul-con">
        {videosList.map(each => (
          <NxtWatchVideos each={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="videos-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        className="home-failure-image"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        we are having some trouble processing your request.Please try again.
      </p>
      <button className="home-button" type="button" onClick={this.getVideos}>
        Retry
      </button>
    </div>
  )

  renderAllVideos = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideosList()
      case apiStatusConstants.failure:
        return this.onFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterKey = event => {
    if (event.key === 'Enter') {
      this.getVideos()
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="home-container">
          <SideBar />
          <div className="content-container">
            <div data-testid="banner" className="background-image">
              <div className="background-inner-con">
                <div className="inner-back-con">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="nxt watch logo"
                    className="website-logo"
                  />
                  <p>But Nxt Watch Premium prepaid plans with UPI</p>
                  <button className="get-it-now-button" type="button">
                    GET IT NOW
                  </button>
                </div>
                <button
                  className="cross-home-button"
                  aria-label="Close"
                  type="button"
                  data-testid="close"
                >
                  <HiOutlineX className="outline-x" />
                </button>
              </div>
            </div>
            <div className="input-con">
              <input
                onChange={this.onChangeInput}
                placeholder="search"
                className="input"
                type="search"
                onKeyDown={this.onEnterKey}
                value={searchInput}
              />
              <button
                aria-label="Close"
                type="button"
                data-testid="searchButton"
              >
                <BsSearch onClick={this.getVideos} />
              </button>
            </div>
            <div className="render-videos-con">{this.renderAllVideos()}</div>
          </div>
        </div>
      </>
    )
  }
}

export default Home
