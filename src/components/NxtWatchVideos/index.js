import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'

import './index.css'

const NxtWatchVideos = props => {
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
    <Link className="nxtwatch-link-con" to={`/videos/${id}`}>
      <li className="videos-li-con">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="thumbnail-logo"
        />
        <div className="text-channel-con">
          <img
            src={profileImageUrl}
            alt="channel logo"
            className="channel-logo"
          />
          <div className="text-con">
            <p className="title-text">{title}</p>
            <p>{channelName}</p>
            <div className="views-published-con">
              <p>{`${viewCount}`}views</p>
              <p> . {publishedData}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default NxtWatchVideos

/*   id: each.id,
        channel: each.channel,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount:  */
