import {Component} from 'react'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'
import {AiOutlineLike} from 'react-icons/ai'
import {BiDislike, BiBookmark} from 'react-icons/bi'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import SideBar from '../SideBar'
import Header from '../Header'
import VideoContext from '../../context/VideoContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    videoDetails: {},
    apiStatus: apiStatusConstants.initial,
    isLikeActive: false,
    isDislikeActive: false,
    isSaveActive: false,
  }

  componentDidMount = () => {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/videos/${id}`

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

      const fetchedData = {
        id: data.video_details.id,
        channelName: data.video_details.channel.name,
        profileImageUrl: data.video_details.channel.profile_image_url,
        subscriberCount: data.video_details.channel.subscriber_count,
        description: data.video_details.description,
        publishedAt: data.video_details.published_at,
        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        viewCount: data.video_details.view_count,
      }

      this.setState({
        videoDetails: fetchedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickLike = () => {
    this.setState(pre => ({
      isLikeActive: !pre.isLikeActive,
      isDislikeActive: pre.isLikeActive,
    }))
  }

  onClickDislike = () => {
    this.setState(pre => ({
      isDislikeActive: !pre.isDislikeActive,
      isLikeActive: pre.isDislikeActive,
    }))
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
        className="video-details-button"
        type="button"
        onClick={this.getVideos}
      >
        Retry
      </button>
    </div>
  )

  renderVideo = () => (
    <VideoContext.Consumer>
      {value => {
        const {
          videoDetails,
          isDislikeActive,
          isSaveActive,
          isLikeActive,
        } = this.state
        const likeStyling = isLikeActive
          ? 'active-like-save-con'
          : 'inactive-like-save-con'

        const dislikeStyling = isDislikeActive
          ? 'active-like-save-con'
          : 'inactive-like-save-con'

        const {
          id,
          channelName,
          profileImageUrl,
          subscriberCount,
          description,
          publishedAt,
          thumbnailUrl,
          title,
          videoUrl,
          viewCount,
        } = videoDetails
        const date = formatDistanceToNow(new Date(publishedAt))
        const {saveVideos} = value

        const onShareVideo = () => {
          saveVideos(videoDetails)
        }

        return (
          <>
            <ReactPlayer url={videoUrl} controls />
            <div>
              <p>{title}</p>
              <div className="video-details-view-pub-con">
                <div className="video-details-views-con">
                  <p>{viewCount} views</p>
                  <p> . {date}</p>
                </div>
                <div className="video-details-text-con">
                  <button
                    onClick={this.onClickLike}
                    type="button"
                    className={`${likeStyling}`}
                  >
                    <AiOutlineLike />
                    <p>Like</p>
                  </button>
                  <button
                    onClick={this.onClickDislike}
                    type="button"
                    className={`${dislikeStyling}`}
                  >
                    <BiDislike />
                    <p>Dislike</p>
                  </button>
                  <button
                    onClick={onShareVideo}
                    type="button"
                    className="inactive-like-save-con"
                  >
                    <BiBookmark />
                    <p>Save</p>
                  </button>
                </div>
              </div>
              <hr className="hor" />
              <div className="subscribers-con">
                <img
                  src={profileImageUrl}
                  alt="channel logo"
                  className="video-details-profile"
                />
                <div>
                  <p>{channelName}</p>
                  <p>{subscriberCount} subscribers</p>
                </div>
              </div>
              <div className="video-details-description-con">
                <p>{description}</p>
              </div>
            </div>
          </>
        )
      }}
    </VideoContext.Consumer>
  )

  renderVideoDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideo()
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
          <div className="video-details-con">{this.renderVideoDetails()}</div>
        </div>
      </>
    )
  }
}

export default VideoItemDetails
