import { Button, Container, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosClient } from '../../utils/axios-client'
import TitleWithData from '../reusable/title-with-data'

export default function AuctionsDetails() {
  const [auction, setAuction] = useState(null)

  const { id } = useParams()
  useEffect(() => {
    axiosClient.get(`auctions/${id}`).then(
      (response) => {
        setAuction(response.data)
      },
      () => {}
    )
  }, [id])

  return (
    <>
      {auction ? (
        <Container disableGutters maxWidth="md" component="main" sx={{ pt: 8, pb: 6 }}>
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
          <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
            <Button type="button" variant="contained" href={`auctions/${id}/add-offer`}>
              Złóż ofertę
            </Button>
            <Button type="button" variant="contained" href="/auctions">
              Powrót do listy
            </Button>
          </Stack>
        </Container>
      ) : null}
    </>
  )
}
