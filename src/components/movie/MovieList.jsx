import { Swiper, SwiperSlide } from 'swiper/react'
import MovieCard from './MovieCard'
import useSWR from 'swr'
import { fetcher } from '@/config.js'
import { useEffect, useState } from 'react'
import { tmdbAPI } from '../../config'

const MovieList = ({ type = 'now_playing' }) => {
  const { data } = useSWR(tmdbAPI.getMovieList(type), fetcher)
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
              <MovieCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}

export default MovieList
