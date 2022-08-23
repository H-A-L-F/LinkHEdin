import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/color.scss'
import './styles/index.scss'
import './styles/component.scss'
import { ProvideAuth } from './hooks/useAuth'
import { App } from './App'
import { LoadingContextProvider } from './hooks/useLoading'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <LoadingContextProvider>
    <ProvideAuth>
      <App />
    </ProvideAuth>
  </LoadingContextProvider>
)
