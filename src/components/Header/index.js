import {Link, withRouter} from 'react-router-dom'

import Popup from 'reactjs-popup'
import {BsMoon} from 'react-icons/bs'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="nav-header">
      <div className="nav-content">
        <div className="nav-image-con">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="website logo"
              className="website-logo"
            />
          </Link>
        </div>
        <div className="nav-right-con">
          <button
            aria-label="Close"
            type="button"
            className="theme-button"
            data-testid="theme"
          >
            <BsMoon className="react-icon" />
          </button>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
            alt="profile"
            className="profile-img"
          />
          <Popup
            trigger={
              <button className="logout-button" type="button">
                Logout
              </button>
            }
            className="popup-content"
            modal
          >
            {close => (
              <div className="pop-container">
                <p className="pop-up-para">Are you sure, you want to logout</p>
                <button
                  onClick={() => close()}
                  type="button"
                  className="trigger-button cancel"
                >
                  cancel
                </button>
                <button
                  onClick={onClickLogout}
                  type="button"
                  className="trigger-button confirm"
                >
                  confirm
                </button>
              </div>
            )}
          </Popup>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Header)
