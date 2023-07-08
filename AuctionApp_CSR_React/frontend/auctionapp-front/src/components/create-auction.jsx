import { Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { axiosClient } from '../utils/axios-client'
import { isLogged } from '../utils/jwt-utils'

export default function CreateAuction() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLogged()) {
      navigate('/login')
      toast.error('Zaloguj się, aby wykonać tą akcję')
    }
  }, [navigate])

  const handleSubmit = (event) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const endDateTime = new Date(data.get('endDateTime').toString())
    if (endDateTime < new Date()) {
      toast.error('Czas zakończenia musi być późniejszy niż obecny czas')
      return
    }

    axiosClient.post(`create`, data).then(
      (response) => {
        toast.success('Pomyślnie dodano przetarg!')
        navigate(`/auctions/${response.data}/details`)
      },
      () => {}
    )
  }

  return (
    <Container disableGutters maxWidth="md" component="main" sx={{ pt: 3, pb: 6 }}>
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
            Dodawanie nowego przetargu
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nazwa przetargu"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label="Opis"
              name="description"
              autoComplete="description"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="endDateTime"
              label="Data i godzina zakończenia"
              name="endDateTime"
              autoComplete="endDateTime"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="maxAmount"
              label="Wartość oferty"
              name="maxAmount"
              type="number"
              autoComplete="maxAmount"
              InputProps={{ inputProps: { min: '1', step: '1' } }}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              Dodaj przetarg
            </Button>
          </Box>
        </Box>
      </Container>
    </Container>
  )
}
