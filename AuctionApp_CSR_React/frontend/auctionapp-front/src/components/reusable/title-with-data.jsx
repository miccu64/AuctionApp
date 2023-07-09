import { Stack, Typography } from '@mui/material'

export default function TitleWithData({ title, data, dataSx = null }) {
  return (
    <Stack direction="row" spacing={2}>
      <Typography variant="h5" color="text.primary" component="span" sx={{ marginRight: 3 }}>
        <b>{title}:</b>
      </Typography>

      <Typography variant="h5" color="text.secondary" component="span" sx={dataSx}>
        {data}
      </Typography>
    </Stack>
  )
}
