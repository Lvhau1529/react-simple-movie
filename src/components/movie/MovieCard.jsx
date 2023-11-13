import { useNavigate } from "react-router-dom";

const MovieCard = ({ props }) => {
  const navigate = useNavigate(); 

  return (
    <>
      <div className='movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none'>
        <img
          src={`https://image.tmdb.org/t/p/w500/${props?.poster_path}`}
          alt=''
          className='w-full object-cover rounded-lg mb-5'
        />
        <div className='flex flex-col flex-1'>
          <h3 className='text-xl font-bold mb-3'>{props?.title}</h3>
          <div className='flex propss-center justify-between text-sm opacity-50 mb-10'>
            <span>{new Date(props?.release_date).getFullYear()}</span>
            <span>{props?.vote_average}</span>
          </div>
          <button
            onClick={() => navigate(`/movies/${props.id}`)}
            className='py-3 px-6 rounded-lg capitalize mt-auto bg-primary'
          >
            Watch now
          </button>
        </div>
      </div>
    </>
  )
}

export default MovieCard
