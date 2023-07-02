import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { axiosClient } from '../utils/axios-client'

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'name',
    headerName: 'Nazwa',
    width: 150,
    flex: 0.4
  },
  {
    field: 'user',
    headerName: 'Twórca',
    width: 150,
    valueGetter: ({ value }) => value.fullName,
    flex: 0.4
  },
  {
    field: 'description',
    headerName: 'Opis',
    width: 150,
    flex: 0.2
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
  }
]

export default function ActiveAuctions() {
  const [auctions, setAuctions] = useState([])

  useEffect(() => {
    axiosClient.get('auctions').then(
      (response) => {
        setAuctions(response.data)
        console.log(response.data)
      },
      () => {}
    )
  }, [])

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
        pageSizeOptions={[10]}
      />
    </Box>
  )
}
