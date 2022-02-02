import { Route, Routes } from 'react-router-dom'

export default function MyRoutes() {
  return (
    <main className={'w-full h-full pt-4'}>
      <Routes>
        <Route path="/">
          <Route path="" />
          <Route path="/profile" />
        </Route>
        <Route path="/search">
          <Route path="" />
          <Route path="/search/add" />
        </Route>
        <Route path="/list">
          <Route path="" />
          <Route path="/list/play">
            <Route path="" />
            <Route path="/list/play/edit" />
          </Route>
        </Route>
        <Route path="*" />
      </Routes>
    </main>
  )
}
