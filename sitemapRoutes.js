import { Route } from 'react-router-dom'

export default function MyRoutes() {
  return (
    <Route>
      <Route path="/" />
      <Route path="/profile" />
      <Route path="/search" />
      <Route path="/search/add" />
      <Route path="/list" />
      <Route path="/list/play" />
      <Route path="/list/play/edit" />
      <Route path="*" />
    </Route>
  )
}
