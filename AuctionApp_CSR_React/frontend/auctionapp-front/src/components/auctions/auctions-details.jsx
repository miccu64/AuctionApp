import { Box, Button, Container, CssBaseline, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { axiosClient } from '../../utils/axios-client'
import { isLogged } from '../../utils/jwt-utils'
import TitleWithData from '../reusable/title-with-data'

export default function AuctionsDetails() {
  const [auction, setAuction] = useState(null)
  const [inputValue, setInputValue] = useState('')

  const { id } = useParams()
  useEffect(() => {
    axiosClient.get(`auctions/${id}`).then(
      (response) => {
        setAuction(response.data)
      },
      () => {}
    )
  }, [id])

  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault()

    if (!isLogged()) {
      toast.error('Zaloguj się, aby wykonać akcję')
      navigate('/login')
      return
    }

    const data = new FormData(event.currentTarget)
    axiosClient.put(`auctions/${id}/add-offer`, data).then(
      (response) => {
        toast.success(response.data)
        setInputValue('')
      },
      () => {}
    )
  }

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
            <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
              <Button type="button" variant="contained" href="/auctions" fullWidth>
                Powrót do listy
              </Button>
            </Stack>
          </Container>

          <Container sx={{ mt: 8 }}>
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
              <Typography component="h1" variant="h5">
                Dodawanie nowej oferty
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="amount"
                  label="Wartość oferty"
                  name="amount"
                  type="number"
                  autoComplete="amount"
                  autoFocus
                  InputProps={{ inputProps: { min: '1', step: '1' } }}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
                  Dodaj ofertę
                </Button>
              </Box>
            </Box>
          </Container>
        </Container>
      ) : null}
    </>
  )
}
