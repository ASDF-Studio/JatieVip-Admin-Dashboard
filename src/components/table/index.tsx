import { CircularProgress } from '@mui/material'
import { Sort } from 'components/icons'
import { useAdmin } from 'hooks/useAdmin'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Data } from 'ui/dashboard/tableData'

export const CustomTable = ({ onClick, users, loading, changePage, count }) => {
  const columns = [
    {
      name: 'Name',
      cell: (row) => {
        return (
          <div className="gap-2 flex flex-row items-center">
            <img
              className="w-10 h-10 rounded-full"
              src={
                row?.profilePic ||
                'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'
              }
            />
            <p className="font-DM_Sans font-normal leading-normal tracking-wide text-main-black text-base">
              {row.fullName}
            </p>
          </div>
        )
      },
      sortable: true,
      width: '200px',
    },
    {
      name: 'Username',
      selector: (row) => row.username,
      sortable: true,
      width: '150px',
    },
    {
      name: 'Phone',
      selector: (row) => row.contact,
      sortable: true,
      width: '140px',
    },

    {
      name: 'User Type',
      selector: (row) => (row?.isVIP ? 'VIP' : 'FREE'),
      sortable: true,
      width: '128px',
    },
    {
      name: 'Country',
      selector: (row) => row.location,
      sortable: true,
      width: '176px',
    },
    {
      name: 'Member Since',
      selector: (row) => new Date(row.created_at).toISOString().slice(0, 10),
      sortable: true,
      width: '170px',
    },
  ]

  function convertArrayOfObjectsToCSV(array) {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(Data[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach((item) => {
      let ctr = 0
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  function downloadCSV(array) {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv == null) return

    const filename = 'export.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }

  const handleChangePage = (page) => {
    changePage(page - 1)
  }

  return (
    <DataTable
      customStyles={{
        headCells: {
          style: {
            '&:hover': {
              backgroundColor: 'rgba(211, 167, 8, 0.2)',
            },
          },
        },
        headRow: {
          style: {
            backgroundColor: 'rgb(250, 244, 225)',
            borderRadius: '10px',
            borderWidth: '1px',
            borderColor: 'rgba(211, 167, 8, 0.32)',
            letterSpacing: '0.025em',
            lineHeight: 1.5,
            fontWeight: 500,
            fontSize: '16px',
          },
        },
        rows: {
          highlightOnHoverStyle: {
            backgroundColor: 'rgba(211, 167, 8, 0.2)',
          },
          style: {
            paddingTop: '8px',
            paddingBottom: '8px',

            letterSpacing: '0.025em',
            lineHeight: 1.5,
            fontWeight: 400,
            fontSize: '16px',
          },
        },
      }}
      sortIcon={<Sort className="w-[10px] h-[10px] ml-[5px] fill-[#9381ff]" />}
      highlightOnHover
      pointerOnHover
      progressPending={loading}
      columns={columns}
      progressComponent={<CircularProgress className='w-8 h-8' />}
      paginationTotalRows={count}
      paginationServer
      // paginationServerOptions={}
      paginationResetDefaultPage={true}
      paginationPerPage={20}
      paginationRowsPerPageOptions={[20]}
      onChangePage={handleChangePage}
      data={users}
      pagination
      // selectableRows
      onRowClicked={onClick}
    />
  )
}
