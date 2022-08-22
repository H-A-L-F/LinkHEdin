import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/color.scss'
import './styles/index.scss'
import './styles/component.scss'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:8080/query',
  cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
)
