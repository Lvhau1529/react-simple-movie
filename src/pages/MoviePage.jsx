import useSWR from 'swr'
import { fetcher } from '../config'
import MovieCard from '../components/movie/MovieCard'
import { useEffect, useState } from 'react'

const apiPopularMovie = () => `https://api.themoviedb.org/3/movie/popular?api_key=f379b750fd188bc3ec72f0760d768302`

const MoviePage = () => {
  const { data } = useSWR(apiPopularMovie(), fetcher)

  const [movies, setMovies] = useState()

  useEffect(() => {
    if (data && data.results) setMovies(data.results)
  }, [data])

  return (
    <>
      <div className='py-10 page-container'>
        <div className='flex mb-10'>
          <div className='flex-1'>
            <input
              type='text'
              className='w-full p-4 bg-slate-800 text-white outline-none rounded-tl-lg rounded-bl-lg'
              placeholder='Type here to search...'
            />
          </div>
          <button className='p-4 bg-primary text-white rounded-tr-lg rounded-br-lg'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </button>
        </div>
        <div className='grid grid-cols-4 gap-10'>
          {movies?.length > 0 && movies?.map((item) => <MovieCard key={item.id} props={item}></MovieCard>)}
        </div>
      </div>
    </>
  )
}

export default MoviePage
