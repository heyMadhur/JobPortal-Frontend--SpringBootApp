import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { setLoading } from '@/redux/authSlice'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import useGetJobById from '@/hooks/useGetJobById'
import { setSingleJob } from '@/redux/jobSlice';



function PostJob({buttonName}) {
    const params = useParams();
    if (buttonName === 'Update Job' && params.id) {
        useGetJobById(params.id)
    }

    
    const { allCompanies } = useSelector(store => store.company)
    const { loading, user } = useSelector(store => store.auth)
    const { singleJob } = useSelector(store => store.job)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [input, setInput] = useState({
        title: singleJob?.title || '',
        description: singleJob?.description || '',
        requirements: singleJob?.requirements || '',
        salary: singleJob?.salary || '',
        location: singleJob?.location || '',
        jobType: singleJob?.jobType || '',
        experienceLevel: singleJob?.experienceLevel || '',
        position: singleJob?.position || 0,
        companyId: singleJob?.companyId || '',
    });


    useEffect(()=>{        
        // Fetch job details only if updating
        setInput(
            {
                title: singleJob?.title || '',
                description: singleJob?.description || '',
                requirements: singleJob?.requirements || '',
                salary: singleJob?.salary || '',
                location: singleJob?.location || '',
                jobType: singleJob?.jobType || '',
                experienceLevel: singleJob?.experienceLevel || '',
                position: singleJob?.position || 0,
                companyId: singleJob?.companyId || '',
            }
        )
        
    }, [singleJob])
    useEffect(() => {
      
        return ()=>{
            dispatch(setSingleJob(null));
        }
    }, [])
    

    
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const selectChangeHandler = (value) => {
        const selectedCompany = allCompanies.find((company) => company.companyName.toLowerCase() === value)
        setInput({ ...input, companyId: selectedCompany.id })

    }
    

    const submitHandler = async (e) => {
        e.preventDefault();
        try {   

            input.requirements= input.requirements.split(",").map(req => req.trim());
            
            dispatch(setLoading(true))

            let res;
            if (buttonName === 'Update Job' && params.id) {
                res = await axios.put(`${JOB_API_END_POINT}/update/${singleJob.id}/admin/${user.id}`, input, {
                    headers: {
                        'Content-Type': "application/json"
                    },
                    withCredentials: true
                })
            } else {
                res = await axios.post(`${JOB_API_END_POINT}/post/admin/${user.id}`, input, {
                    headers: {
                        'Content-Type': "application/json"
                    },
                    withCredentials: true
                })
            }


            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/admin/jobs")
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        } finally {
            input.requirements= input.requirements.toString();
            dispatch(setLoading(false));
        }

    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="text"
                                name="experienceLevel"
                                value={input.experienceLevel}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>No of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        {
                            allCompanies.length > 0 && (
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={`Select a Company`} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                allCompanies.map((company) => {
                                                    return (
                                                        <SelectItem key={company.id} value={company?.companyName?.toLowerCase()}>{company.companyName}</SelectItem>
                                                    )
                                                })
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }
                    </div>
                    {
                        loading ?
                            <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait</Button>
                            :
                            <Button type="submit" className="w-full my-4">{buttonName}</Button>
                    }
                    {
                        allCompanies.length === 0 && <p className='text-sm text-red-600 font-bold text-center my-3'>*Please Register a company first, before posting a job </p>
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob
