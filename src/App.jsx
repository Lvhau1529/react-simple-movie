import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Main from './components/layouts/Main'
import './App.css'
import 'swiper/css'

const HomePage = lazy(() => import('@/pages/HomePage'))
const Banner = lazy(() => import('@/components/banner/Banner'))
const MoviePageV2 = lazy(() => import('@/pages/MoviePageV2'))
const MovieDetailsPage = lazy(() => import('@/pages/MovieDetailsPage'))

function App() {
  return (
    <>
      <Suspense>
        <Routes>
          <Route element={<Main />}>
            <Route
              path='/'
              element={
                <>
                  <Banner />
                  <HomePage />
                </>
              }
            />
            <Route path='/movies' element={<MoviePageV2 />} />
            <Route path='/movie/:movieId' element={<MovieDetailsPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
