import { Container } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { axiosClient } from '../../utils/axios-client'
import { isLogged } from '../../utils/jwt-utils'
import UserDataGrid from './user-data-grid'

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
    field: 'auctionId',
    headerName: 'ID',
    width: 70,
    valueGetter: (params) => params.row.auction.id
  },
  {
    field: 'auctionName',
    headerName: 'Nazwa',
    width: 150,
    flex: 0.33,
    valueGetter: (params) => params.row.auction.name
  },
  {
    field: 'auctionDescription',
    headerName: 'Opis',
    width: 150,
    flex: 0.34,
    valueGetter: (params) => params.row.auction.description
  },
  {
    field: 'auctionStartDateTime',
    headerName: 'Data rozpoczęcia',
    type: 'dateTime',
    width: 180,
    valueGetter: (params) => new Date(params.row.auction.startDateTime)
  },
  {
    field: 'auctionEndDateTime',
    headerName: 'Data zakończenia',
    type: 'dateTime',
    width: 180,
    valueGetter: (params) => new Date(params.row.auction.endDateTime)
  },
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
        setAuctions(response.data.createdAuctions)
        setHistoricalAuctions(response.data.historicalAuctions)
        setOffers(response.data.submittedOffers)
        setHistoricalOffers(response.data.submittedHistoricalOffers)
      },
      () => {}
    )
  }, [navigate])

  const onAuctionsClick = (params) => {
    navigate(`/auctions/${params.row.id}/details`)
  }
  const onHistoricalAuctionsClick = (params) => {
    navigate(`/history/${params.row.id}/details`)
  }
  const onOffersClick = (params) => {
    navigate(`/auctions/${params.row.auction.id}/details`)
  }
  const onHistoricalOffersClick = (params) => {
    navigate(`/history/${params.row.auction.id}/details`)
  }

  const userDataGridDatas = [
    ['Twoje niezakończone przetargi', auctions, auctionColumns, onAuctionsClick],
    ['Twoje zakończone przetargi', historicalAuctions, auctionColumns, onHistoricalAuctionsClick],
    ['Trwające przetargi, w których brałeś/brałaś udział', offers, offerColumns, onOffersClick],
    ['Zakończone przetargi, w których brałeś/brałaś udział', historicalOffers, offerColumns, onHistoricalOffersClick]
  ]

  return (
    <Container sx={{ mt: 2 }}>
      {userDataGridDatas.map((data) => (
        <UserDataGrid
          title={data[0]}
          auctions={data[1]}
          columns={data[2]}
          onRowClick={data[3]}
          key={data[0].toString()}></UserDataGrid>
      ))}
    </Container>
  )
}
