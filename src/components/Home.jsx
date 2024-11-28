import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Search } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import Footer from './shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { motion } from "framer-motion"


const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth)
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate('/admin/companies')
    }
  }, [])

  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  )
}

const HeroSection = () => {
  const [query, setQuery] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');

  }

  return (
    <div className='text-center'>
      <div className='flex flex-col gap-5 my-10'>
        <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
        <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className="text-[#6A38C2]">Dream Job</span></h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit fuga reiciendis animi quibusdam eligendi.</p>
        <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
          <input type="text"
            placeholder='Find your dream jobs'
            onChange={(e) => dispatch(setQuery(e.target.value))}
            className='outline-none border-none w-full'
          />
          <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
            <Search className='h-5 w-5' />
          </Button>
        </div>
      </div>
    </div>
  );
}
const category = [
  "Frontend Developer", "Backend Developer", "Data Science", "Graphic Designer", "FullStack Developer"
]
const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');

  }
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {
            category.map((cat, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg-basis-1/3">
                <Button onClick={() => searchJobHandler(cat)} variant="outline" className="rounded-full">{cat}</Button>
              </CarouselItem>

            ))
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

    </div>
  )
}

const LatestJobCards = ({ job }) => {
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
      <div>
        <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>India</p>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge className='text-blue-700 font-bold' variant="ghost">{job?.position} Positions</Badge>
        <Badge className='text-[#F83002] font-bold' variant="ghost">{job?.jobType}</Badge>
        <Badge className='text-[#7209B7] font-bold' variant="ghost">{job?.salary} LPA</Badge>
      </div>

    </div>
  )
}

const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job)
  const navigate = useNavigate();
  return (
    <div className='max-w-7xl mx-auto my-20'>
      <h1 className='text-4xl font-bold'> <span className='text-[#6A38C2]'>Latest & Top </span>Job Openings</h1>
      <div className='grid grid-cols-3 gap-4 my-5'>
        {
          allJobs <= 0 ? <span> No Job Available </span> : allJobs?.slice(0, 6).map((job) => <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            onClick={() => navigate(`/jobs/description/${job.id}`)}
            key={job.id}><LatestJobCards key={job.id} job={job} /></motion.div>)
        }

      </div>

    </div>
  )
}

export default Home
