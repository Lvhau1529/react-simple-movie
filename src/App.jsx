import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Main from './components/layouts/Main'
import Banner from './components/banner/Banner'
import MoviePage from './pages/MoviePage'
import MovieDetailsPage from './pages/MovieDetailsPage'
import 'swiper/css'

function App() {
  return (
    <>
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
          <Route path='/movies' element={<MoviePage />} />
          <Route path='/movies/:movieId' element={<MovieDetailsPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
