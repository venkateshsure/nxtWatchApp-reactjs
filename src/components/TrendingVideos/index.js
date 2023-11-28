import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'

import './index.css'

const TrendingVideos = props => {
  const {each} = props
  const {
    id,
    channelName,
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
    profileImageUrl,
  } = each
  const publishedData = formatDistanceToNow(new Date(publishedAt))
  return (
    <Link className="trending-link-con" to={`/videos/${id}`}>
      <li className="trending-videos-li-con">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="trending-thumbnail-logo"
        />
        <div className="trending-text-channel-con">
          <div className="text-con">
            <p className="title-text">{title}</p>
            <p>{channelName}</p>
            <div className="trending-views-published-con">
              <p>{`${viewCount}`} views</p>
              <p> .{publishedData}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default TrendingVideos
