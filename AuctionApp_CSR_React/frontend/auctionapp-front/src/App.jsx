import { ThemeProvider, createTheme } from '@mui/material/styles'
import PropTypes from 'prop-types'
import * as React from 'react'
import { BrowserRouter, MemoryRouter, Route, Link as RouterLink, Routes } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import Auctions from './components/auctions/auctions'
import AuctionsDetails from './components/auctions/auctions-details'
import CreateAuction from './components/create-auction'
import History from './components/history/history'
import HistoryDetails from './components/history/history-details'
import Home from './components/home'
import Login from './components/login'
import Navbar from './components/navbar'
import Register from './components/register'
import UserAuctionsOffers from './components/user/user-auctions-offers'

const LinkBehavior = React.forwardRef((props, ref) => {
  const { href, ...other } = props
  // Map href (MUI) -> to (react-router)
  return <RouterLink data-testid="custom-link" ref={ref} to={href} {...other} />
})

LinkBehavior.propTypes = {
  href: PropTypes.oneOfType([
    PropTypes.shape({
      hash: PropTypes.string,
      pathname: PropTypes.string,
      search: PropTypes.string
    }),
    PropTypes.string
  ]).isRequired
}

function Router(props) {
  const { children } = props
  if (typeof window === 'undefined') {
    return <StaticRouter location="/">{children}</StaticRouter>
  }
  return <MemoryRouter>{children}</MemoryRouter>
}

Router.propTypes = {
  children: PropTypes.node
}

const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior
      }
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior
      }
    },
    MuiMenuItem: {
      defaultProps: {
        component: LinkBehavior
      }
    }
  }
})

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="top-right" pauseOnFocusLoss={false} />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="auctions" element={<Auctions />} />
            <Route path="auctions/:id/details" element={<AuctionsDetails />} />
            <Route path="create" element={<CreateAuction />} />
            <Route path="history" element={<History />} />
            <Route path="history/:id/details" element={<HistoryDetails />} />
            <Route path="user" element={<UserAuctionsOffers />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
