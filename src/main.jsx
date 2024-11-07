import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Theme } from '@radix-ui/themes'

import '@radix-ui/themes/styles.css'

import App from './App'

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider {...{ client }}>
      <Theme appearance='dark' accentColor='gray' grayColor='slate' radius='small'>
        <App />
      </Theme>
    </QueryClientProvider>
  </React.StrictMode>
)
