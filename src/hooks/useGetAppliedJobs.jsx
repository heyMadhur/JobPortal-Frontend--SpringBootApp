import { setAllAppliedJobs } from '@/redux/jobSlice';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);


    useEffect(() => {
        const fetchAppliedJobs = async () => {
            console.log("Fetching all applied Jobs");
            
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get-all-applied-jobs/user/${user.id}`, { withCredentials: true })
                console.log("Response of Fetch all User Applied Jobs= ",res);
                
                // if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.obj));
                    // console.log("In Fetch S");
                    
                // }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedJobs();
    }, [])
}
export default useGetAppliedJobs