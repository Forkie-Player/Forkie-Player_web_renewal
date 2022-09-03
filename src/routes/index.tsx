import { Navigate, Route, Routes } from 'react-router-dom'
import * as Constants from '../lib/constants'
import Home from './Home'
import List from './List'
import Forkie from './oauth/Forkie'
import Vimeo from './oauth/Vimeo'
import Play from './Play'
import ProfilePage from './Profile'
import Search from './Search'
import VideoAdd from './VideoAdd'
import VideoTimeChange from './VideoTimeChange'

export default function MyRoutes() {
  return (
    <main className={'h-full w-full pt-4'}>
      <Routes>
        <Route path={Constants.NavAbsolutePathItems.HOME}>
          <Route path={''} element={<Home />} />
          <Route path={Constants.NavAbsolutePathItems.PROFILE} element={<ProfilePage />} />
        </Route>
        <Route path={Constants.NavAbsolutePathItems.SEARCH}>
          <Route path={''} element={<Search />} />
          <Route path={Constants.NavAbsolutePathItems.VIDEO_ADD} element={<VideoAdd />} />
        </Route>
        <Route path={Constants.NavAbsolutePathItems.LIST}>
          <Route path={''} element={<List />} />
          <Route path={Constants.NavAbsolutePathItems.PLAY}>
            <Route path={''} element={<Play />} />
            <Route path={Constants.NavAbsolutePathItems.VIDEO_EDIT} element={<VideoTimeChange />} />
          </Route>
        </Route>
        <Route path={Constants.NavAbsolutePathItems.OAUTH}>
          <Route path={''} element={<Forkie />} />
          <Route path={Constants.NavAbsolutePathItems.OAUTH_VIMEO} element={<Vimeo />} />
        </Route>
        <Route path="*" element={<Navigate to={Constants.NavAbsolutePathItems.HOME} />} />
      </Routes>
    </main>
  )
}
