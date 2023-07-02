import { Container, List, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosClient } from '../../utils/axios-client'

export default function AuctionsDetails() {
  const [auction, setAuction] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    axiosClient.get(`auctions/${id}`).then(
      (response) => {
        setAuction(response.data)
        console.log(response.data)
      },
      () => {}
    )
  }, [id])

  const titleSyle={ marginRight: 3 }

  return (
    <>
      {auction ? (
        <Container disableGutters maxWidth="md" component="main" sx={{ pt: 8, pb: 6 }}>
          <Typography variant="h3" align="center" color="text.primary" gutterBottom>
            {auction.name}
          </Typography>
          <Typography variant="h5" color="text.primary" component="span" sx={titleSyle}>
            <b>Opis:</b>
          </Typography>

          <Typography variant="h5" color="text.secondary" component="span">
            {auction.description}
          </Typography>
          <Typography variant="h5" align="left" color="text.primary" component="p">
            Możliwości:
          </Typography>
          <List sx={{ listStyleType: 'disc', pl: 4 }}>
            {/* {abilities.map((a) => (
          <ListItem key={a} sx={{ display: 'list-item' }}>
            <Typography variant="h6" color="text.secondary" component="p">
              {a}
            </Typography>
          </ListItem>
        ))} */}
          </List>
        </Container>
      ) : null}
    </>
  )
}
