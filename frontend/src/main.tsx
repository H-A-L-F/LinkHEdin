import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/color.scss'
import './styles/index.scss'
import './styles/component.scss'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import Login from './pages/login/Login'
import { useLocalStorage } from './hooks/useLocalStorage'

const client = new ApolloClient({
  uri: 'http://localhost:8080/query',
  cache: new InMemoryCache(),
})

const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <div data-theme={theme}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<App />} />
        </Routes>
      </BrowserRouter>
      <App />
    </ApolloProvider>
  </div>
)
