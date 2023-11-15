import { useNavigate } from 'react-router-dom'
import Button from '../button/Button'

const MovieCard = ({ props }) => {
  const navigate = useNavigate()

  return (
    <>
      <div className='movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none'>
        <img
          src={
            props?.poster_path
              ? `https://image.tmdb.org/t/p/original/${props.poster_path}`
              : 'https://picsum.photos/500'
          }
          alt=''
          className='w-full object-cover rounded-lg mb-5'
        />
        <div className='flex flex-col flex-1'>
          <h3 className='text-xl font-bold mb-3'>{props?.title}</h3>
          <div className='flex propss-center justify-between text-sm opacity-50 mb-10'>
            <span>{new Date(props?.release_date).getFullYear()}</span>
            <span>{props?.vote_average}</span>
          </div>
          <Button bgColor='secondary' onClick={() => navigate(`/movie/${props?.id}`)}>
            Watch now
          </Button>
        </div>
      </div>
    </>
  )
}

export default MovieCard
