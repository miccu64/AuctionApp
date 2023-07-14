import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosClient } from '../../utils/axios-client'
import { getUserId } from '../../utils/jwt-utils'

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
  }
]

export default function Auctions() {
  const [auctions, setAuctions] = useState([])

  useEffect(() => {
    axiosClient.get('auctions').then(
      (response) => {
        setAuctions(response.data)
      },
      () => {}
    )
  }, [])

  const navigate = useNavigate()
  const onRowClick = (params) => {
    navigate(`/auctions/${params.id}/details`)
  }
  const userId = getUserId()
  const colourRow = (params) => {
    return params.row.userId.toString() === userId?.toString() ? 'green-row' : ''
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
        pageSizeOptions={[5, 10, 15, 20, 50, 100]}
        onRowClick={onRowClick}
        getRowClassName={colourRow}
      />
    </Box>
  )
}
