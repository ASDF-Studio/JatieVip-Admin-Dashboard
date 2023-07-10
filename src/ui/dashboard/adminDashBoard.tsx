import { IconButton, Typography } from '@mui/material'
import {
  BoxSelect,
  Button,
  ConfirmationModal,
  Input,
  Option,
  Search,
  Sort,
  UserDetails,
  UserIcon,
  CustomTable,
} from 'components'
import { ErrorModal } from 'components/modals/error-modal'
import { StripeError } from 'lib/error'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, ReactElement, useEffect, useState } from 'react'
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
  const [name, setName] = useState()
  const [phone, setPhone] = useState()
  const [userName, setUserName] = useState()
  const [userType, setUserType] = useState()
  const [country, setCountry] = useState()
  const [memberSince, setMemberSince] = useState()
  const [userImage, setUserImage] = useState()
  const [gender, setGender] = useState()
  const [email, setEmail] = useState()
  const [acountStatus, setAccountStatus] = useState()
  const [acknowledgeText, setAcknowledgeText] = useState<string>(
    'I acknowledge that I signed up through the MoveFit website & I must cancel my membership on the website.',
  )

  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const listenClickEvent = (e) => {
    if (showProfileMenu) {
      const el = document.getElementById('option')
      if (!el.contains(e.target)) {
        setShowProfileMenu(false)
      }
    }
  }

  useEffect(() => {
    document.addEventListener('click', listenClickEvent)

    return () => document.removeEventListener('click', listenClickEvent)
  }, [showProfileMenu])

  const handleCSV = async () => {
    console.log('CSV')
  }

  const handleClickOpen = (item) => {
    setShowReactiveModal(true)
    setName(item.Name)
    setPhone(item.Phone)
    setUserName(item.Username)
    setUserType(item.UserType)
    setCountry(item.Country)
    setMemberSince(item.MemberSince)
    setUserImage(item.Image)
    setGender(item.Gender)
    setEmail(item.email)
    setAccountStatus(item.AccountStatus)
  }
  const handleAction = async () => {
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

  const HeaderColumn = ({ item }) => (
    <th
      onClick={() => setOrderItem(!orderItem)}
      key={item.label}
      scope="col"
      className={`py-2 hover:bg-fill-lightestYellow ${item.id === 'name' && 'rounded-l-lg'} ${
        item.id === 'action' && 'rounded-r-lg'
      }`}
    >
      <div
        className={`flex flex-row items-center w-32 whitespace-nowrap ${item.id === 'name' && 'w-52'} ${
          item.id === 'Country' && 'w-40'
        } ${item.id === 'action' && 'mr-2'}`}
      >
        <span className="ml-2 font-DM_Sans font-medium leading-normal tracking-wide">{item.label}</span>
        {item.id && (
          <div className="ml-1 w-3 h-3 text-[7px] flex justify-center items-center">
            {orderItem === true ? (
              <Sort className="w-[6px] h-[10px] fill-[#9381ff]" />
            ) : (
              <Sort className="w-[6px] h-[10px] fill-[#9381ff]" />
            )}
          </div>
        )}
      </div>
    </th>
  )

  let tableRowStyle =
    'flex items-center text-main-black font-DM_Sans font-normal leading-normal tracking-wide text-base cursor-pointer'

  const TableList = ({ Name, Username, Phone, UserType, Country, MemberSince, Image }) => (
    <>
      <td className={`w-52 cursor-pointer`}>
        <div className="gap-2 flex flex-row items-center">
          <img className="w-10 h-10 rounded-full" src={Image} />
          <p className="font-DM_Sans font-normal leading-normal tracking-wide text-main-black text-base">{Name}</p>
        </div>
      </td>
      <td className={`w-32 ${tableRowStyle}`}>{Username}</td>
      <td className={`w-32 ${tableRowStyle}`}>{Phone}</td>
      <td className={`w-32 ${tableRowStyle}`}>{UserType + ' User'}</td>
      <td className={`w-44 ${tableRowStyle}`}>{Country}</td>
      <td className={`${tableRowStyle}`}>{MemberSince}</td>
    </>
  )

  return (
    <div className={`${className}`}>
      <div className="flex justify-between flex-col sm:flex-row">
        <div className="flex flex-row items-center gap-[12px] justify-between sm:gap-[16px] sm:justify-start">
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
          <div id="option" className={`rounded-full border-[2px] ${showProfileMenu && 'border-primary-brand'}`}>
            <IconButton
              className="p-0 w-[50px] h-[50px] rounded-full bg-fill-lightYellow flex items-center justify-center"
              disableRipple
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <Option className={`w-[20px] h-[20px] fill-[#d3a708]`} />
            </IconButton>
            {showProfileMenu && (
              <div className="absolute w-[174px] py-[5px] right-[15px] sm:right-[290px] bg-white shadow-selectShadow border border-[#e5e7ec] rounded-lg top-[190px]  sm:top-[180px] z-10">
                <div
                  onClick={() => {
                    handleCSV()
                    setShowProfileMenu(false)
                  }}
                  className="px-[21px] hover:bg-fill-lightYellow py-[7px]"
                >
                  <Typography className="text-black font-normal cursor-pointer">Export as CSV</Typography>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* table */}
      <div className="mt-8 z-0">
        <CustomTable onClick={(item) => handleClickOpen(item)} />
      </div>

      
      <ErrorModal isCreate onAccept={handleAction} open={showError} setOpen={setShowError} error={error} />
      <UserDetails
        open={showReactiveModal}
        setOpen={setShowReactiveModal}
        cancel="Cancel"
        onAccept={handleAction}
        save="Save"
        Name={name}
        Phone={phone}
        Username={userName}
        UserType={userType}
        Country={country}
        MemberSince={memberSince}
        UserImage={userImage}
        Gender={gender}
        AccountStatus={acountStatus}
        Email={email}
      />
    </div>
  )
}

export default AdminDashBoard
