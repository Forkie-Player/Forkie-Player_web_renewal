import { Route, Routes } from 'react-router-dom'
import * as Constants from '../lib/constants'
import Home from './Home'
import List from './List'
import Play from './Play'
import Search from './Search'
import VideoAdd from './VideoAdd'
import VideoTimeChange from './VideoTimeChange'

export default function MyRoutes() {
  return (
    <div className={'w-full h-full pt-8'}>
      <Routes>
        <Route path={Constants.NavAbsolutePathItems.HOME} element={<Home />} />
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
      </Routes>
    </div>
  )
}
