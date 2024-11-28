import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'

function Applicants() {
    const jobId = useParams().id;
    const dispatch = useDispatch();
    const { allApplicants } = useSelector(store => store.application)

    useEffect(() => {
        // fetch data from API
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/getapplicants/${jobId}`, { withCredentials: true })
                console.log("Response All Appliocants: ", res);
                
                if (res.data.success) {
                    dispatch(setAllApplicants(res.data.obj))
                }
            } catch (error) {
                console.log(error);

            }
        }
        fetchAllApplicants()


    }, [])


    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-bold text-xl my-5'>Applicants ({allApplicants.length})</h1>
                <ApplicantsTable />

            </div>
        </div>
    )
}

const ApplicantsTable = () => {

    const { allApplicants } = useSelector(store => store.application);
    const shortListingStatus = ["Accepted", "Rejected"];

    console.log("All Applicants in Table= ", allApplicants);
    

    const statusHandler = async (id, status) => {
        status = status.toUpperCase();
        // Converting it in Json
        status = { status: status }
        

        try {
            const res = await axios.put(`${APPLICATION_API_END_POINT}/status/update/${id}`, status, { withCredentials: true });

            if (res.data.success) {
                toast.success(res.data.message);

            }
        } catch (error) {
            toast.error(error.response.data.message);

        }
    }
    return (
        <Table>
            <TableCaption>A list of users applied for the job posted</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Resume</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    allApplicants.length <= 0 ? <span>There are no Applications for the Job Posted yet...</span>
                        :
                        allApplicants?.map((item) => {

                            return (
                                <TableRow key={item.id}>
                                    <TableCell>{item?.applicant?.fullName}</TableCell>
                                    <TableCell>{item?.applicant?.email}</TableCell>
                                    <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                    <TableCell>
                                        {
                                            item?.applicant?.profile?.resumeUrl ?
                                                <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resumeUrl} target='_blank'>{item?.applicant?.profile?.resumeOriginalName}</a>
                                                :
                                                <span>NA</span>
                                        }

                                    </TableCell>
                                    <TableCell>{"12 Nov"||item.createdAt.split("T")[0]}</TableCell>
                                    <TableCell className="text-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                {
                                                    shortListingStatus.map((status, index) => {
                                                        return (
                                                            //                                  User.id, Status
                                                            <div onClick={() => statusHandler(item?.id, status)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                                <span>{status}</span>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                }
            </TableBody>
        </Table>
    )
}

export default Applicants
