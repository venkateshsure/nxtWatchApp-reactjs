import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {FaHeart} from 'react-icons/fa'

import GamingVideos from '../GamingVideos'

import SideBar from '../SideBar'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Gaming extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    gamingVideos: [],
  }

  componentDidMount = () => {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/videos/gaming'

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

        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))

      this.setState({
        gamingVideos: fetchedData,
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
        className="gaming-failure-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        we are having some trouble processing your request.Please try again.
      </p>
      <button className="gaming-button" type="button" onClick={this.getVideos}>
        Retry
      </button>
    </div>
  )

  renderVideosList = () => {
    const {gamingVideos} = this.state
    return (
      <ul className="ul-gaming-videos-con">
        {gamingVideos.map(each => (
          <GamingVideos each={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderGamingVideos = () => {
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
          <div className="gaming-videos-con">
            <div className="gaming-videos-text-con">
              <FaHeart />
              <p>Gaming</p>
            </div>
            {this.renderGamingVideos()}
          </div>
        </div>
      </>
    )
  }
}

export default Gaming
