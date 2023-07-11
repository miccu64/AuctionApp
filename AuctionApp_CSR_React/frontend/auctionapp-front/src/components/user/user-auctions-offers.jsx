import { Container, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { axiosClient } from '../../utils/axios-client'
import { isLogged } from '../../utils/jwt-utils'

const auctionColumns = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'name',
    headerName: 'Nazwa',
    width: 150,
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
    field: 'maxAmount',
    headerName: 'Maks. wartość',
    width: 120,
    valueGetter: ({ value }) => value.toString() + ' zł'
  }
]

const offerColumns = [
  
  {
    field: 'amount',
    headerName: 'Wartość oferty',
    width: 150,
    valueGetter: ({ value }) => value.toString() + ' zł'
  }
]

export default function UserAuctionsOffers() {
  const [auctions, setAuctions] = useState([])
  const [historicalAuctions, setHistoricalAuctions] = useState([])
  const [offers, setOffers] = useState([])
  const [historicalOffers, setHistoricalOffers] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    if (!isLogged()) {
      navigate('/login')
      toast.error('Zaloguj się, aby wykonać tą akcję')
      return
    }

    axiosClient.get('user/participated').then(
      (response) => {
        console.log(response.data)
        setAuctions(response.data.createdAuctions)
        setHistoricalAuctions(response.data.historicalAuctions)
        setOffers(response.data.submittedOffers)
        setHistoricalOffers(response.data.submittedHistoricalOffers)
      },
      () => {}
    )
  }, [navigate])

  const noElementsTypography = (
    <Typography variant="h6" align="center" color="text.secondary" gutterBottom>
      Brak
    </Typography>
  )

  return (
    <Container sx={{ mt: 2 }}>
      <Container sx={{ mb: 4 }}>
        <Typography variant="h6" align="center" color="text.primary" gutterBottom>
          Twoje niezakończone przetargi
        </Typography>
        {auctions.length > 0 ? (
          <DataGrid
            rows={auctions}
            columns={auctionColumns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5
                }
              }
            }}
            pageSizeOptions={[5, 10, 20, 50]}
            //onRowClick={onRowClick}
          />
        ) : (
          noElementsTypography
        )}
      </Container>

      <Container sx={{ mb: 4 }}>
        <Typography variant="h6" align="center" color="text.primary" gutterBottom>
          Twoje zakończone przetargi
        </Typography>
        {historicalAuctions.length > 0 ? (
          <DataGrid
            rows={historicalAuctions}
            columns={auctionColumns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5
                }
              }
            }}
            pageSizeOptions={[5, 10, 20, 50]}
            //onRowClick={onRowClick}
          />
        ) : (
          noElementsTypography
        )}
      </Container>

      <Container sx={{ mb: 4 }}>
        <Typography variant="h6" align="center" color="text.primary" gutterBottom>
          Trwające przetargi, w których brałeś/brałaś udział
        </Typography>
        {offers.length > 0 ? (
          <DataGrid
            rows={offers}
            columns={offerColumns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5
                }
              }
            }}
            pageSizeOptions={[5, 10, 20, 50]}
            //onRowClick={onRowClick}
          />
        ) : (
          noElementsTypography
        )}
      </Container>

      <Container>
        <Typography variant="h6" align="center" color="text.primary" gutterBottom>
          Zakończone przetargi, w których brałeś/brałaś udział
        </Typography>
        {historicalOffers.length > 0 ? <></> : noElementsTypography}
      </Container>
    </Container>
  )
}
