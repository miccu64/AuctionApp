import { Container, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

export default function UserDataGrid({ title, auctions, columns, onRowClick }) {
  return (
    <Container sx={{ mb: 4 }}>
      <Typography variant="h6" align="center" color="text.primary" gutterBottom>
        {title}
      </Typography>
      {auctions.length > 0 ? (
        <DataGrid
          rows={auctions}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5
              }
            }
          }}
          pageSizeOptions={[5, 10, 20, 50]}
          onRowClick={onRowClick}
        />
      ) : (
        <Typography variant="h6" align="center" color="text.secondary" gutterBottom>
          Brak
        </Typography>
      )}
    </Container>
  )
}
