import useSWR from 'swr'
import { fetcher } from '@/config.js'
import { SwiperSlide, Swiper } from 'swiper/react'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=f379b750fd188bc3ec72f0760d768302`,
    fetcher
  )
  const dataGenre = useSWR(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=f379b750fd188bc3ec72f0760d768302`,
    fetcher
  )
  const movies = data?.results || []
  const genres = dataGenre?.data?.genres || []

  const getGenre = (genreIds) => {
    return genres.filter((genre) => genreIds.includes(genre.id)).map((genre) => genre.name)
  }

  return (
    <section className='banner h-[500px] page-container mb-20 overflow-hidden'>
      <Swiper
        grabCursor='true'
        slidesPerView={'auto'}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item} genres={getGenre(item.genre_ids)}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  )
}

function BannerItem({ item, genres }) {
  const { title, backdrop_path } = item
  const navigate = useNavigate()

  return (
    <div className='w-full h-full rounded-lg relative'>
      <div className='overlay absolute inset-0 bg-gradient-to-t from-slate-800 to-[rgba(0,0,0, 0.5)] rounded-lg'></div>
      <img
        src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
        alt=''
        className='w-full h-full object-cover rounded-lg'
      />
      <div className='absolute left-5 bottom-5 w-full text-white'>
        <h2 className='font-bold text-3xl mb-5'>{title}</h2>
        <div className='flex items-center gap-x-3 mb-8'>
          {genres.map((item) => (
            <span key={item} className='py-2 px-4 border border-white rounded-md'>
              {item}
            </span>
          ))}
        </div>
        {/* <Button onClick={() => navigate(`/movie/${id}`)}>Watch now</Button> */}
        <button onClick={() => navigate(`/movies/${item?.id}`)}>Watch now</button>
      </div>
    </div>
  )
}

export default Banner
