import { useParams } from 'react-router-dom'
import { fetcher, tmdbAPI } from '../config'
import useSWR from 'swr'
import { SwiperSlide, Swiper } from 'swiper/react'
import MovieCard from '@/components/movie/MovieCard'

const MovieDetailsPage = () => {
  const params = useParams()
  const { data } = useSWR(tmdbAPI.getMovieDetails(params.movieId), fetcher)
  if (!data) return null
  const { backdrop_path, poster_path, title, genres, overview } = data

  return (
    <>
      <div className='py-10'>
        <div className='w-full h-[600px] relative'>
          <div className='absolute inset-0 bg-black bg-opacity-70'></div>
          <div
            className='w-full h-full bg-cover bg-no-repeat'
            style={{
              backgroundImage: `url(${tmdbAPI.imageOriginal(backdrop_path)})`
            }}
          ></div>
        </div>
        <div className='w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10'>
          <img src={tmdbAPI.imageOriginal(poster_path)} className='w-full h-full object-cover rounded-xl' alt='' />
        </div>
        <h1 className='text-center text-4xl font-bold text-white mb-10'>{title}</h1>
        {genres.length > 0 && (
          <div className='flex items-center justify-center gap-x-5 mb-10'>
            {genres.map((item) => (
              <span className='py-2 px-4 border-primary text-primary border rounded' key={item.id}>
                {item.name}
              </span>
            ))}
          </div>
        )}
        <p className='text-center leading-relaxed max-w-[600px] mx-auto mb-10'>{overview}</p>
      </div>
      <MovieCredits />
      <MovieVideos />
      <MovieSimilar />
    </>
  )
}

function MovieCredits() {
  const { movieId } = useParams()
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, 'credits'), fetcher)
  if (!data) return null
  const { cast } = data
  if (!cast || cast.length <= 0) return null
  return (
    <div className='py-10'>
      <h2 className='text-center text-3xl mb-10'>Casts</h2>
      <div className='grid grid-cols-4 gap-5'>
        {cast.slice(0, 4).map((item) => (
          <div className='cast-item' key={item.id}>
            <img
              src={tmdbAPI.imageOriginal(item.profile_path)}
              className='w-full h-[350px] object-cover rounded-lg mb-3'
              alt=''
            />
            <h3 className='text-xl font-medium'>{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

function MovieVideos() {
  const { movieId } = useParams()
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, 'videos'), fetcher)
  if (!data) return null
  const { results } = data
  if (!results || results.length <= 0) return null
  return (
    <div className='py-10'>
      <div className='flex flex-row gap-10'>
        {results.slice(0, 4).map((item) => (
          <div className='' key={item.id}>
            <h3 className='mb-5 text-xl font-medium p-3 bg-secondary inline-block'>{item.name}</h3>
            <div key={item.id} className='w-full aspect-video'>
              <iframe
                width='864'
                height='486'
                src={`https://www.youtube.com/embed/${item.key}`}
                title='YouTube video player'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
                className='w-full h-full object-cover'
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MovieSimilar() {
  const { movieId } = useParams()
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, 'similar'), fetcher)
  if (!data) return null
  const { results } = data
  if (!results || results.length === 0) return null
  return (
    <div className='py-10'>
      <h2 className='text-3xl font-medium mb-10'>Similar movies</h2>
      <div className='movie-list'>
        <Swiper grabCursor={'true'} spaceBetween={40} slidesPerView={'auto'}>
          {results.length > 0 &&
            results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  )
}

export default MovieDetailsPage
