import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/color.scss'
import './styles/index.scss'
import './styles/component.scss'
import LoadingContextProvider from './hooks/useLoading'
import { ProvideAuth } from './hooks/useAuth'
import { App } from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ProvideAuth>
    <LoadingContextProvider>
      <App />
    </LoadingContextProvider>
  </ProvideAuth>
)
