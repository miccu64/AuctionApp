import MenuIcon from '@mui/icons-material/Menu'
import { Container, Link, Menu, MenuItem } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { isLogged } from '../utils/common-functions'

const pages = [
  ['/', 'Strona główna'],
  ['/auctions', 'Lista przetargów'],
  ['/history', 'Zakończone przetargi'],
  ['/create', 'Dodaj przetarg']
]

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null)

  const navigate = useNavigate()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }
  const onLogoutClicked = () => {
    localStorage.clear()
    navigate('/')
    toast.success('Poprawnie wylogowano!')
  }
  const logged = isLogged()

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link
              variant="h6"
              noWrap
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}>
              <img src="favicon-white.ico" alt="logo" />
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' }
                }}>
                {pages.map((page) => (
                  <MenuItem
                    href={page[0]}
                    key={page[0]}
                    sx={{ fontWeight: 'bold', color: 'white', display: 'block' }}
                    onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page[1]}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Link
              variant="h5"
              noWrap
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}>
              <img src="favicon-white.ico" alt="logo" />
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  href={page[0]}
                  key={page[0]}
                  sx={{ fontWeight: 'bold', color: 'white', display: 'block' }}
                  onClick={handleCloseNavMenu}>
                  {page[1]}
                </Button>
              ))}
            </Box>
            {!logged ? (
              <Button href="/login" sx={{ fontWeight: 'bold', color: 'white', marginLeft: 'auto' }}>
                Logowanie
              </Button>
            ) : (
              <Button onClick={onLogoutClicked} sx={{ fontWeight: 'bold', color: 'white', marginLeft: 'auto' }}>
                Wyloguj
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Outlet />
    </>
  )
}
