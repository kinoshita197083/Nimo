import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import CoinDetails, { coinDetailLoader } from './pages/CoinDetails'
import { Suspense } from 'react'
import NotFound from './pages/NotFound'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Home />} />
        <Route path='/coins/:coinId'
          element={<CoinDetails />}
          loader={coinDetailLoader}
          errorElement={<NotFound />}
        />
        <Route path='*' element={<NotFound />} />
      </>
    )
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
