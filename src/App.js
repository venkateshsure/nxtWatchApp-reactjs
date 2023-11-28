import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoItemDetails from './components/VideoItemDetails'
import SavedVideos from './components/SavedVideos'

import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import VideoContext from './context/VideoContext'

import './App.css'

class App extends Component {
  state = {SavedVideosList: []}

  saveVideos = video => {
    console.log(video)
    this.setState(pre => ({SavedVideosList: [...pre.SavedVideosList, video]}))
  }

  render() {
    const {SavedVideosList} = this.state
    return (
      <VideoContext.Provider
        value={{SavedVideosList, saveVideos: this.saveVideos}}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </VideoContext.Provider>
    )
  }
}

export default App
