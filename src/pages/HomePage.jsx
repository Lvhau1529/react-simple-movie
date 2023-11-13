import MovieList from '@/components/movie/MovieList'

const HomePage = () => {
  return (
    <>
      <section className='movie-layout page-container pb-5'>
        <h2 className='capitalize text-white mb-5 text-2xl font-bold'>Now playing</h2>
        <MovieList type='now_playing' />
      </section>
      <section className='movie-layout page-container pb-5'>
        <h2 className='capitalize text-white mb-5 text-2xl font-bold'>Top Rate</h2>
        <MovieList type='top_rated' />
      </section>
      <section className='movie-layout page-container pb-5'>
        <h2 className='capitalize text-white mb-5 text-2xl font-bold'>Upcoming</h2>
        <MovieList type='upcoming' />
      </section>
    </>
  )
}

export default HomePage
