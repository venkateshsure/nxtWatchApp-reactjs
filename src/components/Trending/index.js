import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {FaPhoenixSquadron} from 'react-icons/fa'

import TrendingVideos from '../TrendingVideos'

import SideBar from '../SideBar'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Trending extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    trendingVideos: [],
  }

  componentDidMount = () => {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/videos/trending'

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
        trendingVideos: fetchedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div data-testid="loader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="not-found-trending"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble to complete your request. Please try again.
      </p>
      <button
        className="trending-button"
        type="button"
        onClick={this.getVideos}
      >
        Retry
      </button>
    </div>
  )

  renderVideosList = () => {
    const {trendingVideos} = this.state
    return (
      <ul className="ul-trending-videos-con">
        {trendingVideos.map(each => (
          <TrendingVideos each={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderTrendingVideos = () => {
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

  render() {
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
            {this.renderTrendingVideos()}
          </div>
        </div>
      </>
    )
  }
}

export default Trending
