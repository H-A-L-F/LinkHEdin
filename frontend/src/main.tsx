import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './color.scss'
import './index.scss'
import './component.scss'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import Login from './pages/login/Login'

const client = new ApolloClient({
  uri: 'http://localhost:8080/query',
  cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<App />} />
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
)
