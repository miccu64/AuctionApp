import { List, ListItem } from '@mui/material'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

export default function Home() {
  const abilities = [
    'przeglądanie szczegółów przetargów',
    'wyświetlanie zakończonych przetargów',
    'dodawanie nowych przetargów',
    'branie udziału w przetargu',
    'logowanie i rejestracja',
    'podgląd własnych przetargów i aukcji.'
  ]

  return (
    <Container disableGutters maxWidth="md" component="main" sx={{ pt: 8, pb: 6 }}>
      <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
        AuctionApp
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" component="p">
        Aplikacja służy do przeglądania przetargów oraz brania w nich udziału.
      </Typography>
      <Typography variant="h5" align="left" color="text.secondary" component="p" sx={{ mt: 3 }}>
        Możliwości:
      </Typography>
      <List sx={{ listStyleType: 'disc', pl: 4 }}>
        {abilities.map((a) => (
          <ListItem key={a} sx={{ display: 'list-item' }}>
            <Typography variant="h6" color="text.secondary" component="p">
              {a}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Container>
  )
}
