import { setSingleJob } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const useGetJobById = async (jobId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Fetchign Job by Id= ", jobId);
        
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                console.log(res);
                
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.obj));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [])
}

export default useGetJobById
