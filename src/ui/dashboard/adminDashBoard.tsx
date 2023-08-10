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
import dynamic from 'next/dynamic'
import { Data } from './tableData'
import { useAdmin } from 'hooks/useAdmin'

type Props = {
  className?: string
}

const AdminDashBoard: FC<Props> = ({ className }): ReactElement => {
  const { users, count, changePage, loading, debouncedSearch, reFetch } = useAdmin()

  const [searchValue, setSearchValue] = useState('')
  const [selected, setSelected] = useState<ISelectedProduct>(SubsPLans[1] as ISelectedProduct)
  const [error, setError] = useState<string>(null)
  const [showError, setShowError] = useState<boolean>(false)
  const router = useRouter()
  const [orderItem, setOrderItem] = useState(false)

  const [showReactiveModal, setShowReactiveModal] = useState(false)
  const [acknowledgeText, setAcknowledgeText] = useState<string>(
    'I acknowledge that I signed up through the MoveFit website & I must cancel my membership on the website.',
  )

  const [selectedUser, setSelectedUser] = useState(null)

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

  const handleAction = async () => {
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
  }

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
              {count}
            </Typography>
          </div>
        </div>

        <div className="flex flex-row items-center gap-[12px] sm:gap-[16px]">
          <div className={`bg-white flex border border-border-yellow rounded-lg w-[340px] h-[40px]`}>
            <div className="ml-3 flex items-center justify-center outline-none focus:outline-none">
              <Search className="w-[12px] fill-[#9381ff]" />
            </div>
            <input
              // value={searchValue}
              onChange={(e) => {
                debouncedSearch(e.target.value)
              }}
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
        <CustomTable
          changePage={changePage}
          loading={loading}
          users={users}
          count={count}
          onClick={(item: any) => {
            setSelectedUser(item)
            setShowReactiveModal(true)
          }}
        />
      </div>

      <ErrorModal isCreate onAccept={handleAction} open={showError} setOpen={setShowError} error={error} />
      {showReactiveModal && (
        <UserDetails
          open={showReactiveModal}
          setOpen={setShowReactiveModal}
          user={selectedUser}
          cancel="Cancel"
          onClose={reFetch}
          onAccept={handleAction}
          save="Save"
        />
      )}
    </div>
  )
}

export default AdminDashBoard
