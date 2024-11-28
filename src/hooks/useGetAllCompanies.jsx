import { setAllCompanies } from '@/redux/companySlice';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';


const useGetAllCompanies = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get-all`, { withCredentials: true });
                
                if (res.data.success) {
                    dispatch(setAllCompanies(res.data.obj));
                }
            } catch (error) {
                console.log("Fetch All COmpanies Error");

                console.log(error);
            }
        }
        fetchAllCompanies();
    }, [])
}

export default useGetAllCompanies
