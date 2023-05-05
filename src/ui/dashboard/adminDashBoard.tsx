import { IconButton, Typography } from '@mui/material'
import { BoxSelect, Button, ConfirmationModal, Input, Option, Search, Sort, UserIcon } from 'components'
import { ErrorModal } from 'components/modals/error-modal'
import { StripeError } from 'lib/error'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, ReactElement, useState } from 'react'
import { StripeService } from 'services/stripe'
import { ISelectedProduct } from 'services/types'
import { SubsPLans } from '../../constants'
import { Data } from './tableData'

type Props = {
  className?: string
}

const AdminDashBoard: FC<Props> = ({ className }): ReactElement => {
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<ISelectedProduct>(SubsPLans[1] as ISelectedProduct)
  const [error, setError] = useState<string>(null)
  const [showError, setShowError] = useState<boolean>(false)
  const router = useRouter()
  const [orderItem, setOrderItem] = useState(false)

  const [showReactiveModal, setShowReactiveModal] = useState(false)
  const [acknowledgeText, setAcknowledgeText] = useState<string>(
    'I acknowledge that I signed up through the MoveFit website & I must cancel my membership on the website.',
  )

  const handleClickOpen = () => {
    setShowReactiveModal(true)
  }
  const handleSubscribe = async () => {
    setLoading(true)
    setShowError(false)
    try {
      const stripeSesion = await StripeService.createSession({ selectedProduct: selected.title })

      window.location.href = stripeSesion.url
    } catch (e) {
      if (e instanceof StripeError) {
        if (e.statusCode === 401) {
          router.push('/login')
        } else {
          setError(e.message)
          setShowError(true)
        }
      }
    }
    setLoading(false)
  }

  let headers = [
		{ label: 'Name', id: 'name', type: 'alphabet' },
		{ label: 'Username', id: 'value' },
		{ label: 'Phone', id: 'changepct_24hour' },
		{ label: 'User Type', id: 'changepct_7d' },
		{ label: 'Country', id: 'Country' },
		{ label: 'Member Since', id: 'action' },
	]

  const Data = [
    {
      id: 1,
      Name: 'Jatie Vip',
      Username: '@JatieVip',
      Phone: '1234',
      UserType:'know',
      Country: 'Bangladesh',
      MemberSince: '9/12/12',
      image:
      'https://res.cloudinary.com/hawktech-cloud/image/upload/v1674712476/d24dae39-1a64-47d5-af65-e14b5a1c533c_tmcsua.png',
    },
    {
        id: 2,
        Name: 'Jatie Vip',
        Username: '@JatieVip',
        Phone: '1234',
        UserType:'know',
        Country: 'Bangladesh',
        MemberSince: '9/12/12',
        image:
      'https://res.cloudinary.com/hawktech-cloud/image/upload/v1674712476/d24dae39-1a64-47d5-af65-e14b5a1c533c_tmcsua.png',
      },
      {
        id: 3,
        Name: 'Jatie Vip',
        Username: '@JatieVip',
        Phone: '1234',
        UserType:'know',
        Country: 'Bangladesh',
        MemberSince: '9/12/12',
        image:
      'https://res.cloudinary.com/hawktech-cloud/image/upload/v1674712476/d24dae39-1a64-47d5-af65-e14b5a1c533c_tmcsua.png',
      },
      {
        id: 4,
        Name: 'Jatie Vip',
        Username: '@JatieVip',
        Phone: '1234',
        UserType:'know',
        Country: 'Bangladesh',
        MemberSince: '9/12/12',
        image:
      'https://res.cloudinary.com/hawktech-cloud/image/upload/v1674712476/d24dae39-1a64-47d5-af65-e14b5a1c533c_tmcsua.png',
      },
      {
        id: 5,
        Name: 'Jatie Vip',
        Username: '@JatieVip',
        Phone: '1234',
        UserType:'know',
        Country: 'Bangladesh',
        MemberSince: '9/12/12',
        image:
      'https://res.cloudinary.com/hawktech-cloud/image/upload/v1674712476/d24dae39-1a64-47d5-af65-e14b5a1c533c_tmcsua.png',
      },
  ];
  
  
  const HeaderColumn = ({ item }) => (
		<th onClick={() => setOrderItem(!orderItem)} key={item.label} scope="col" className="py-2 hover:bg-fill-lightestYellow">
			<div className={`flex flex-row items-center w-32 whitespace-nowrap ${item.id === "name" && 'w-48'} ${item.id === "Country" && 'w-48'} ${item.id === "action" && 'mr-2'}`}>
		    <span className="ml-2 font-DM_Sans font-normal leading-normal tracking-wide">{item.label}</span>
		    {item.id && <div className="ml-1 w-3 h-3 text-[7px] flex justify-center items-center">
			{
					orderItem === true ?
            <Sort className="w-[8px] h-[13px] fill-[#9381ff]" />
           : 
            <Sort className="w-[8px] h-[13px] fill-[#9381ff]" />
				}
				</div>}
			</div>
		</th>
	)

  const TableList = ({ 
    Name,
    Username,
    Phone,
    UserType,
    Country,
    MemberSince,
   }) => (
		<tr className="py-2 pr-5 bg-mian-black grid grid-flow-col justify-between border-b">
			<td className={`w-48 cursor-pointer`}>
      <div className="gap-2 flex flex-row items-center">
        <img className="w-10 h-10 rounded-full" src={'https://res.cloudinary.com/hawktech-cloud/image/upload/v1674712476/d24dae39-1a64-47d5-af65-e14b5a1c533c_tmcsua.png'} />
        <p className="font-DM_Sans font-normal leading-normal tracking-wide text-main-black text-base">{Name}</p>
      </div>
    </td>

    <td className="flex flex-row items-center text-main-gray w-32 font-DM_Sans font-medium leading-normal tracking-wide text-base cursor-pointer">{Username}</td>
    <td className="flex flex-row items-center w-32 text-main-black font-DM_Sans font-medium leading-normal tracking-wide text-base cursor-pointer">{Phone}</td>
    <td className="flex flex-row items-center w-32 text-main-black font-DM_Sans font-medium leading-normal tracking-wide text-base cursor-pointer">{UserType}</td>
    <td className="flex flex-row items-center w-48 text-main-black font-DM_Sans font-medium leading-normal tracking-wide text-base cursor-pointer">{Country}</td>
    <td className='flex flex-row items-center text-main-black font-DM_Sans font-medium leading-normal tracking-wide text-base cursor-pointer'>{MemberSince}</td>
    </tr>
	)

  return (
    <div className={`${className}`}>
      <div className="flex justify-between flex-col sm:flex-row">
        <div className='flex flex-row items-center gap-[12px] justify-between sm:gap-[16px] sm:justify-start'>
          <Typography variant="heading1" className="text-center font-rec x:text-left">
              Manage Users
          </Typography>
          <div className="h-[26px] flex justify-center items-center border rounded-full bg-fill-purple pr-2">
            <IconButton className="" disableRipple>
              <UserIcon className="w-[12px] fill-[#eae7ff]" />
            </IconButton>
            <Typography variant="label2" className="pt-1 font-rec text-white x:text-left">
              12,3098
            </Typography>
          </div>
        </div>

        <div className="flex flex-row items-center gap-[12px] sm:gap-[16px]">
          <div className={`bg-white flex border border-border-yellow rounded-lg w-[340px] h-[40px]`}>
            <div className="ml-3 flex items-center justify-center outline-none focus:outline-none">
              <Search className="w-[12px] fill-[#9381ff]" />
            </div>
            <input 
              placeholder="Search Users…"  
              className={`m-[4px] font-sans font-normal leading-normal tracking-normal text-[13px] text-text-grey appearance-none outline-none`} 
            />          
          </div>
          <div className='w-[50px] h-[50px] rounded-full bg-fill-lightYellow flex items-center justify-center'>
            <Option className="w-[20px] h-[20px] fill-[#d3a708]" />
          </div>
        </div>
      </div>

      {/* table */}
      
        <div className="flex overflow-x-auto relative pt-8 sm:rounded-lg">
          <table className={`w-full text-sm text-left`}>
              <thead className='text-base cursor-pointer text-main-gray rounded-lg'>
                <tr className='grid grid-flow-col justify-between rounded-lg border-[1px] border-border-lightYellow bg-fill-lightYellow'>
                  {headers.map(header => (
                      <HeaderColumn
                        key={header.label + '-coins'}
                        item={header}
                      />
                    ))}
                </tr>
              </thead>
              <tbody>
                {/* {Data.map(coin => {
                    // <TableList key={coin.id} {...coin} />
                    Console.log(coin)
                  })} */}
                  <tr className="py-2 pr-5 bg-mian-black grid grid-flow-col justify-between border-b border-border-lightGrey hover:bg-fill-lightYellow">
                    <td className={`w-48 cursor-pointer`}>
                    <div className="gap-2 flex flex-row items-center">
                      <img className="w-10 h-10 rounded-full" src={'https://res.cloudinary.com/hawktech-cloud/image/upload/v1674712476/d24dae39-1a64-47d5-af65-e14b5a1c533c_tmcsua.png'} />
                      <p className="font-DM_Sans font-normal leading-normal tracking-wide text-main-black text-base">{'Pan Feng'}</p>
                    </div>
                  </td>

                  <td className="flex flex-row items-center text-main-gray w-32 font-DM_Sans font-medium leading-normal tracking-wide text-base cursor-pointer">{'@username'}</td>
                  <td className="flex flex-row items-center w-32 text-main-black font-DM_Sans font-medium leading-normal tracking-wide text-base cursor-pointer">{'01 293 3980'}</td>
                  <td className="flex flex-row items-center w-32 text-main-black font-DM_Sans font-medium leading-normal tracking-wide text-base cursor-pointer">{'Free User'}</td>
                  <td className="flex flex-row items-center w-48 text-main-black font-DM_Sans font-medium leading-normal tracking-wide text-base cursor-pointer">{'Bangkok'}</td>
                  <td className='flex flex-row items-center text-main-black font-DM_Sans font-medium leading-normal tracking-wide text-base cursor-pointer'>{'9/13/2023'}</td>
                  </tr>

                  <tr className="py-2 pr-5 bg-mian-black grid grid-flow-col justify-between border-b border-border-lightGrey hover:bg-fill-lightYellow">
                    <td className={`w-48 cursor-pointer`}>
                    <div className="gap-2 flex flex-row items-center">
                      <img className="w-10 h-10 rounded-full" src={'https://res.cloudinary.com/hawktech-cloud/image/upload/v1674712476/d24dae39-1a64-47d5-af65-e14b5a1c533c_tmcsua.png'} />
                      <p className="font-DM_Sans font-normal leading-normal tracking-wide text-main-black text-base">{'Pan Feng'}</p>
                    </div>
                  </td>

                  <td className="flex flex-row items-center text-main-gray w-32 font-DM_Sans font-medium leading-normal tracking-wide text-base cursor-pointer">{'@username'}</td>
                  <td className="flex flex-row items-center w-32 text-main-black font-DM_Sans font-medium leading-normal tracking-wide text-base cursor-pointer">{'01 293 3980'}</td>
                  <td className="flex flex-row items-center w-32 text-main-black font-DM_Sans font-medium leading-normal tracking-wide text-base cursor-pointer">{'Free User'}</td>
                  <td className="flex flex-row items-center w-48 text-main-black font-DM_Sans font-medium leading-normal tracking-wide text-base cursor-pointer">{'Bangkok'}</td>
                  <td className='flex flex-row items-center text-main-black font-DM_Sans font-medium leading-normal tracking-wide text-base cursor-pointer'>{'9/13/2023'}</td>
                </tr>

                <tr className="py-2 pr-5 bg-mian-black grid grid-flow-col justify-between border-b border-border-lightGrey hover:bg-fill-lightYellow">
                    <td className={`w-48 cursor-pointer`}>
                    <div className="gap-2 flex flex-row items-center">
                      <img className="w-10 h-10 rounded-full" src={'https://res.cloudinary.com/hawktech-cloud/image/upload/v1674712476/d24dae39-1a64-47d5-af65-e14b5a1c533c_tmcsua.png'} />
                      <p className="font-DM_Sans font-normal leading-normal tracking-wide text-main-black text-base">{'Pan Feng'}</p>
                    </div>
                  </td>

                  <td className="flex flex-row items-center text-main-gray w-32 font-DM_Sans font-medium leading-normal tracking-wide text-base cursor-pointer">{'@username'}</td>
                  <td className="flex flex-row items-center w-32 text-main-black font-DM_Sans font-medium leading-normal tracking-wide text-base cursor-pointer">{'01 293 3980'}</td>
                  <td className="flex flex-row items-center w-32 text-main-black font-DM_Sans font-medium leading-normal tracking-wide text-base cursor-pointer">{'Free User'}</td>
                  <td className="flex flex-row items-center w-48 text-main-black font-DM_Sans font-medium leading-normal tracking-wide text-base cursor-pointer">{'Bangkok'}</td>
                  <td className='flex flex-row items-center text-main-black font-DM_Sans font-medium leading-normal tracking-wide text-base cursor-pointer'>{'9/13/2023'}</td>
                </tr>

                <tr className="py-2 pr-5 bg-mian-black grid grid-flow-col justify-between border-b border-border-lightGrey hover:bg-fill-lightYellow">
                    <td className={`w-48 cursor-pointer`}>
                    <div className="gap-2 flex flex-row items-center">
                      <img className="w-10 h-10 rounded-full" src={'https://res.cloudinary.com/hawktech-cloud/image/upload/v1674712476/d24dae39-1a64-47d5-af65-e14b5a1c533c_tmcsua.png'} />
                      <p className="font-DM_Sans font-normal leading-normal tracking-wide text-main-black text-base">{'Pan Feng'}</p>
                    </div>
                  </td>

                  <td className="flex flex-row items-center text-main-gray w-32 font-DM_Sans font-medium leading-normal tracking-wide text-base cursor-pointer">{'@username'}</td>
                  <td className="flex flex-row items-center w-32 text-main-black font-DM_Sans font-medium leading-normal tracking-wide text-base cursor-pointer">{'01 293 3980'}</td>
                  <td className="flex flex-row items-center w-32 text-main-black font-DM_Sans font-medium leading-normal tracking-wide text-base cursor-pointer">{'Free User'}</td>
                  <td className="flex flex-row items-center w-48 text-main-black font-DM_Sans font-medium leading-normal tracking-wide text-base cursor-pointer">{'Bangkok'}</td>
                  <td className='flex flex-row items-center text-main-black font-DM_Sans font-medium leading-normal tracking-wide text-base cursor-pointer'>{'9/13/2023'}</td>
                </tr>
		        </tbody>
          </table>
        </div>
      <ErrorModal isCreate onAccept={handleSubscribe} open={showError} setOpen={setShowError} error={error} />
      <ConfirmationModal
        open={showReactiveModal}
        setOpen={setShowReactiveModal}
        cancelText="Cancel"
        onAccept={handleSubscribe}
        acceptText="Continue"
        contentText={acknowledgeText}
      />
    </div>
  )
}

export default AdminDashBoard
