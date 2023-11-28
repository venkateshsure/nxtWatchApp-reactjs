import {Component} from 'react'
import {Link} from 'react-router-dom'

import {BsFillHouseDoorFill} from 'react-icons/bs'

import {BiBookmark} from 'react-icons/bi'

import {SiYoutubegaming} from 'react-icons/si'

import {FaPhoenixSquadron} from 'react-icons/fa'

import './index.css'

class SideBar extends Component {
  render() {
    return (
      <div className="side-bar-con">
        <div className="home-con">
          <Link className="link-con" to="/">
            <BsFillHouseDoorFill />
            <h1 className="home-text">Home</h1>
          </Link>
        </div>
        <div className="home-con">
          <Link className="link-con" to="/trending">
            <FaPhoenixSquadron />
            <h1 className="home-text">Trending</h1>
          </Link>
        </div>
        <div className="home-con">
          <Link className="link-con" to="/gaming">
            <SiYoutubegaming />
            <h1 className="home-text">Gaming</h1>
          </Link>
        </div>
        <div className="home-con">
          <Link className="link-con" to="/saved-videos">
            <BiBookmark />

            <h1 className="home-text">Saved videos</h1>
          </Link>
        </div>
        <div className="bottom-con">
          <p>CONTACT US</p>
          <div className="fac-twi-link-con">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
              alt="facebook logo"
              className="facebook"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
              alt="twitter logo"
              className="twitter"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
              alt="linked in logo"
              className="linked-in"
            />
          </div>
          <p>Enjoy! Now to see your channels and recommendations!</p>
        </div>
      </div>
    )
  }
}

export default SideBar
