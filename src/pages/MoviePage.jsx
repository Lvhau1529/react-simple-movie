import useSWR from 'swr'
import { apiKey, fetcher } from '../config'
import MovieCard from '../components/movie/MovieCard'
import { useEffect, useState } from 'react'
import useDebounce from '../hooks/useDebounce'
import ReactPaginate from 'react-paginate'

const MoviePage = () => {
  const [movies, setMovies] = useState()
  const [filter, setFilter] = useState()
  const [pageCount, setPageCount] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [url, setUrl] = useState()
  const itemsPerPage = 25

  const { data } = useSWR(url, fetcher)
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
      setUrl(`https://api.themoviedb.org/3/search/movie?query=${filterDebounce}&api_key=${apiKey}`)
    } else {
      setUrl(`https://api.themoviedb.org/3/movie/popular?page=${currentPage}&api_key=${apiKey}`)
    }
  }, [filterDebounce, currentPage])

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
          {movies?.length > 0 && movies?.map((item) => <MovieCard key={item.id} props={item}></MovieCard>)}
        </div>
        <ReactPaginate
          breakLabel='...'
          nextLabel='next >'
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel='< previous'
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
    </>
  )
}

export default MoviePage
