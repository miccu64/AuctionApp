import { Button, Container, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosClient } from '../../utils/axios-client'
import HistoryOfferDataGrid from '../reusable/history-offer-data-grid'
import TitleWithData from '../reusable/title-with-data'

export default function HistoryDetails() {
  const [auction, setAuction] = useState(null)
  const [properOffers, setProperOffers] = useState(null)
  const [otherOffers, setOtherOffers] = useState(null)

  const { id } = useParams()
  useEffect(() => {
    axiosClient.get(`history/${id}`).then(
      (response) => {
        console.log(response.data)
        setAuction(response.data.auction)
        setProperOffers(response.data.properOffers)
        setOtherOffers(response.data.otherOffers)
      },
      () => {}
    )
  }, [id])

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

            <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
              <Button type="button" variant="contained" href="/history" fullWidth>
                Powrót do listy zakończonych przetargów
              </Button>
            </Stack>

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
