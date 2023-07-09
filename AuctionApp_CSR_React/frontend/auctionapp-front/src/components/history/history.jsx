import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosClient } from '../../utils/axios-client'

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'name',
    headerName: 'Nazwa',
    width: 150,
    flex: 0.33
  },
  {
    field: 'user',
    headerName: 'Twórca',
    width: 150,
    valueGetter: ({ value }) => value.fullName,
    flex: 0.33
  },
  {
    field: 'description',
    headerName: 'Opis',
    width: 150,
    flex: 0.34
  },
  {
    field: 'startDateTime',
    headerName: 'Data rozpoczęcia',
    type: 'dateTime',
    width: 180,
    valueGetter: ({ value }) => new Date(value)
  },
  {
    field: 'endDateTime',
    headerName: 'Data zakończenia',
    type: 'dateTime',
    width: 180,
    valueGetter: ({ value }) => new Date(value)
  },
  {
    field: 'auctionOffers',
    headerName: 'Ilość ofert',
    type: 'number',
    width: 80,
    valueGetter: ({ value }) => value.length
  },
  {
    field: 'maxAmount',
    headerName: 'Maks. wartość',
    width: 120,
    valueGetter: ({ value }) => value.toString() + ' zł'
  }
]

export default function History() {
  const [auctions, setAuctions] = useState([])

  useEffect(() => {
    axiosClient.get('history').then(
      (response) => {
        setAuctions(response.data)
        console.log(response.data)
      },
      () => {}
    )
  }, [])

  const navigate = useNavigate()
  const onRowClick = (params) => {
    navigate(`/history/${params.id}/details`)
  }
  const colourRow = (params) => {
    return params.row.auctionOffers?.some((a) => a.amount <= params.row.maxAmount) ? 'green-row' : 'red-row'
  }

  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        rows={auctions}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10
            }
          }
        }}
        pageSizeOptions={[5, 10, 20, 50]}
        onRowClick={onRowClick}
        getRowClassName={colourRow}
      />
    </Box>
  )
}
