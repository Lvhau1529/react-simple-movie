import { Swiper, SwiperSlide } from 'swiper/react'
import MovieCard from './MovieCard'
import useSWR from 'swr'
import { fetcher } from '@/config.js'
import { useEffect, useState } from 'react'

const apiListMovie = (type) => `https://api.themoviedb.org/3/movie/${type}?api_key=f379b750fd188bc3ec72f0760d768302`

const MovieList = ({ type = 'now_playing' }) => {
  const { data } = useSWR(apiListMovie(type), fetcher)
  const [movies, setMovie] = useState()

  useEffect(() => {
    if (data && data.results) setMovie(data.results)
  }, [data])
  return (
    <>
      <div className='movie-list'>
        <Swiper slidesPerView={'auto'} spaceBetween={40} grabCursor={true}>
          {movies?.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard props={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}

export default MovieList
