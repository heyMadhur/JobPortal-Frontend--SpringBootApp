import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
  useGetAllCompanies()
  const navigate = useNavigate();
  const [input, setInput] = useState("")
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchCompanyByText(input))

  }, [input])
  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
          <Input
            className="w-fit"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate('/admin/companies/create')}>New Company</Button>
        </div>
        <CompaniesTable />

      </div>
    </div>
  )
}

const CompaniesTable = () => {
  const { allCompanies, searchCompanyByText } = useSelector(store => store.company);
  const [filterCompany, setFilterCompany] = useState(allCompanies)
  const navigate = useNavigate();


  useEffect(() => {
    
    const filteredCompany = allCompanies.length > 0 ? allCompanies.filter((company) => {
      if (!searchCompanyByText) {
        return true;
      }
      return company.companyName.toLowerCase().includes(searchCompanyByText.toLowerCase())

    }) : [];

    setFilterCompany(filteredCompany);
  }, [allCompanies, searchCompanyByText]);

  return (
    <>
      <Table>
        <TableCaption>A list of your recent Registered Companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            filterCompany.length <= 0 ? <span>You haven't Registered any company yet...</span>
              :
              filterCompany?.map((company) => {
                return (
                  <TableRow key={company.id}>
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={company?.logoUrl} alt="profile" />
                      </Avatar>
                    </TableCell>
                    <TableCell>{company.companyName}</TableCell>
                    {/* <TableCell>{company.date!= null?company.date.split("T")[0]: "NA"}</TableCell> */}
                    <TableCell>{company.date}</TableCell>
                    <TableCell className="text-right cursor-pointer">
                      <Popover>
                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                        <PopoverContent className="w-32">
                          <div onClick={() => navigate(`/admin/companies/${company.id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                            <Edit2 className='w-4' />
                            <span>Edit</span>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                )
              })
          }
        </TableBody>
      </Table>
    </>
  );
}

export default Companies
