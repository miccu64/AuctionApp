import { Box, Container, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'amount',
    headerName: 'Wartość',
    width: 180,
    valueGetter: ({ value }) => value.toString() + ' zł'
  },
  {
    field: 'user',
    headerName: 'Składający',
    width: 150,
    valueGetter: ({ value }) => value.fullName,
    flex: 1
  },
  {
    field: 'dateTime',
    headerName: 'Data złożenia',
    type: 'dateTime',
    width: 180,
    valueGetter: ({ value }) => new Date(value)
  }
]

export default function HistoryOfferDataGrid({ offers, title }) {
  return (
    <>
      {offers?.length > 0 ? (
        <Container disableGutters sx={{ mt: 4 }}>
          <Typography variant="h5" align="center" color="text.primary">
            {title}
          </Typography>
          <Box sx={{ width: '100%' }}>
            <DataGrid
              rows={offers}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5
                  }
                }
              }}
              pageSizeOptions={[5, 10, 15, 20, 50, 100]}
              rowSelection={false}
            />
          </Box>
        </Container>
      ) : null}
    </>
  )
}
