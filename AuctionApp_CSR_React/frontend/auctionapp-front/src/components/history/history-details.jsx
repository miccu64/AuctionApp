import { Button, Container, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosClient } from '../../utils/axios-client'
import TitleWithData from '../shared/title-with-data'
import HistoryOfferDataGrid from './history-offer-data-grid'

export default function HistoryDetails() {
  const [auction, setAuction] = useState(null)
  const [properOffers, setProperOffers] = useState([])
  const [otherOffers, setOtherOffers] = useState([])

  const { id } = useParams()
  useEffect(() => {
    axiosClient.get(`history/${id}`).then(
      (response) => {
        setAuction(response.data.auction)
        setProperOffers(response.data.properOffers)
        setOtherOffers(response.data.otherOffers)
      },
      () => {}
    )
  }, [id])

  const navigate = useNavigate()

  return (
    <>
      {auction ? (
        <Container disableGutters maxWidth="md" component="main" sx={{ pt: 3, pb: 6 }}>
          <Container>
            <Typography variant="h3" align="center" color="text.primary" gutterBottom>
              {auction.name}
            </Typography>
            <TitleWithData title={'Opis'} data={auction.description}></TitleWithData>
            <TitleWithData title={'Nazwa twórcy'} data={auction.user.fullName}></TitleWithData>
            <TitleWithData
              title={'Czas rozpoczęcia'}
              data={new Date(auction.startDateTime).toLocaleString()}></TitleWithData>
            <TitleWithData
              title={'Czas zakończenia'}
              data={new Date(auction.endDateTime).toLocaleString()}></TitleWithData>
            <TitleWithData title={'Ilość ofert'} data={properOffers.length + otherOffers.length}></TitleWithData>
            <TitleWithData data={`${auction.maxAmount} zł`} title={'Wartość przetargu'}></TitleWithData>
          </Container>

          <Container sx={{ mt: 2 }}>
            <TitleWithData
              dataSx={{ color: properOffers.length > 0 ? 'green' : 'red' }}
              title={'Status'}
              data={properOffers.length > 0 ? 'Rozstrzygnięty' : 'Nierozstrzygnięty'}></TitleWithData>
            {properOffers.length > 0 ? (
              <>
                <TitleWithData data={properOffers[0].user.fullName} title={'Zwycięzca'}></TitleWithData>
                <TitleWithData
                  data={properOffers[0].amount + ' zł'}
                  title={'Wartość zwycięskiej oferty'}></TitleWithData>
              </>
            ) : null}

            <Button type="button" variant="contained" onClick={() => navigate(-1)} fullWidth sx={{ mt: 3 }}>
              Powrót do listy
            </Button>
          </Container>

          <Container>
            <HistoryOfferDataGrid offers={properOffers} title={'Poprawne oferty'}></HistoryOfferDataGrid>
            <HistoryOfferDataGrid
              offers={otherOffers}
              title={'Oferty przekraczające maks. wartość'}></HistoryOfferDataGrid>
          </Container>
        </Container>
      ) : null}
    </>
  )
}
