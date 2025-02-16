import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { fetcher, tmdbAPI } from '../config'
import MovieCard from '@/components/movie/MovieCard'
import useDebounce from '@/hooks/useDebounce'
import ReactPaginate from 'react-paginate'
import { MovieCardSkeleton } from '@/components/movie/MovieCard'

const MoviePage = () => {
  const [movies, setMovies] = useState()
  const [filter, setFilter] = useState()
  const [pageCount, setPageCount] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [url, setUrl] = useState()
  const itemsPerPage = 25

  const { data } = useSWR(url, fetcher)
  const hasData = data
  const filterDebounce = useDebounce(filter, 500)

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const handlePageClick = (event) => {
    setCurrentPage(+event.selected + 1)
  }

  useEffect(() => {
    if (data && data.results) {
      setMovies(data.results)
      setPageCount(Math.ceil(data.total_results / itemsPerPage))
    }
  }, [data])

  useEffect(() => {
    if (filterDebounce) {
      setUrl(tmdbAPI.getMovieSearch(filterDebounce, currentPage))
    } else {
      setUrl(tmdbAPI.getMovieList('popular', currentPage))
    }
  }, [filterDebounce, currentPage])

  if (hasData) {
    return (
      <>
        <div className='py-10 page-container'>
          <div className='flex mb-10'>
            <div className='flex-1'>
              <input
                type='text'
                className='w-full p-4 bg-slate-800 text-white outline-none rounded-tl-lg rounded-bl-lg'
                placeholder='Type here to search...'
                onChange={handleFilterChange}
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
          <div className='grid grid-cols-4 gap-10 mb-10'>
            {movies?.length > 0 && movies?.map((item) => <MovieCard key={item.id} item={item}></MovieCard>)}
          </div>
          <ReactPaginate
            breakLabel='...'
            nextLabel='next >'
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel='< previous'
            renderOnZeroPageCount={null}
            className='pagination'
          />
        </div>
      </>
    )
  }
  return (
    <>
      <div className='movie-list py-10 page-container'>
        <div className='flex mb-10'>
          <div className='flex-1'>
            <input
              type='text'
              className='w-full p-4 bg-slate-800 text-white outline-none rounded-tl-lg rounded-bl-lg'
              placeholder='Type here to search...'
              onChange={handleFilterChange}
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
        <div className='grid grid-cols-4 gap-10 mb-10'>
          {[1, 2, 3, 4]?.map((item) => (
            <MovieCardSkeleton key={item} />
          ))}
        </div>
      </div>
    </>
  )
}

export default MoviePage
