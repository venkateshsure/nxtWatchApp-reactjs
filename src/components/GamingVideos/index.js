import {Link} from 'react-router-dom'

import './index.css'

const TrendingVideos = props => {
  const {each} = props
  const {
    id,

    thumbnailUrl,
    title,
    viewCount,
  } = each
  return (
    <Link className="gaming-link-con" to={`/videos/${id}`}>
      <li className="gaming-videos-li-con">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="gaming-thumbnail-logo"
        />

        <div className="gaming-text-con">
          <p className="title-text">{title}</p>

          <p>{`${viewCount}`} views watching worldwide</p>
        </div>
      </li>
    </Link>
  )
}

export default TrendingVideos
