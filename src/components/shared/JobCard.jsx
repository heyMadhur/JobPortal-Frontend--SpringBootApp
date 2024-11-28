import { Avatar, AvatarImage } from '../ui/avatar'
import { Bookmark } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'

const SingleJob = ({ job }) => {
    const navigate = useNavigate();


    const daysAgo = (mongoDbTime) => {
        const createdAt = new Date(mongoDbTime);
        const currentTime = new Date();
        const timeDiff = currentTime - createdAt;

        return Math.floor(timeDiff / (1000 * 24 * 60 * 60))

    }

    console.log(job);
    

    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgo(job?.date) === 0 ? "Today" : `${daysAgo(job?.date)} days ago`}</p>
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>

            </div>
            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logoUrl} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg '>{job?.company?.companyName}</h1>
                    <p className='text-gray-500 text-sm '>India</p>
                </div>
            </div>

            <div>
                <h1 className='text-lg font-bold my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>

            <div className='flex items-center gap-2 mt-4'>
                <Badge className='text-blue-700 font-bold' variant="ghost">{job?.position} Positions</Badge>
                <Badge className='text-[#F83002] font-bold' variant="ghost">{job?.jobType}</Badge>
                <Badge className='text-[#7209B7] font-bold' variant="ghost">{job?.salary} LPA</Badge>
            </div>

            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={() => {console.log("JobId= ",job.id);navigate(`/jobs/description/${job?.id}`) }} variant="outline">Details</Button>
                <Button className="bg-[#7209B7]">Save for Later</Button>
            </div>

        </div>
    )
}

export default SingleJob
