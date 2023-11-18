import { useNavigate } from 'react-router-dom'
import Button from '@/components/button/Button'
import LoadingSkeleton from '@/components/loading/LoadingSkeleton'
import PropTypes from 'prop-types'

const MovieCard = ({ item }) => {
  const navigate = useNavigate()

  return (
    <>
      <div className='movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none'>
        <img
          src={
            item?.poster_path ? `https://image.tmdb.org/t/p/original/${item?.poster_path}` : 'https://picsum.photos/500'
          }
          alt=''
          className='w-full object-cover rounded-lg mb-5'
        />
        <div className='flex flex-col flex-1'>
          <h3 className='text-xl font-bold mb-3'>{item?.title}</h3>
          <div className='flex items-center justify-between text-sm opacity-50 mb-10'>
            <span>{new Date(item?.release_date).getFullYear()}</span>
            <span>{item?.vote_average}</span>
          </div>
          <Button bgColor='secondary' onClick={() => navigate(`/movie/${item?.id}`)}>
            Watch now
          </Button>
        </div>
      </div>
    </>
  )
}

MovieCard.propTypes = {
  poster_path: PropTypes.string
}

export default MovieCard

export const MovieCardSkeleton = () => {
  return (
    <div className='movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none'>
      <LoadingSkeleton width='100%' height='250px' radius='8px' className='mb-5'></LoadingSkeleton>
      <div className='flex flex-col flex-1'>
        <h3 className='text-xl font-bold mb-3'>
          <LoadingSkeleton width='100%' height='20px'></LoadingSkeleton>
        </h3>
        <div className='flex items-center justify-between text-sm opacity-50 mb-10'>
          <span>
            <LoadingSkeleton width='50px' height='10px'></LoadingSkeleton>
          </span>
          <span>
            <LoadingSkeleton width='30px' height='10px'></LoadingSkeleton>
          </span>
        </div>
        <LoadingSkeleton width='100%' height='45px' radius='6px'></LoadingSkeleton>
      </div>
    </div>
  )
}
