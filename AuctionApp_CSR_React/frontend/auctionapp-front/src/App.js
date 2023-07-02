import { ThemeProvider, createTheme } from '@mui/material/styles'
import PropTypes from 'prop-types'
import * as React from 'react'
import { BrowserRouter, MemoryRouter, Route, Link as RouterLink, Routes } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ActiveAuctions from './components/active-auctions'
import Home from './components/home'
import Login from './components/login'
import Navbar from './components/navbar'
import Register from './components/register'

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="top-center" pauseOnFocusLoss={false} />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="active-auctions" element={<ActiveAuctions />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
