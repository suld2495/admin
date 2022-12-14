import '../styles/reset.scss'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import AdminLayout from '../components/admin/layout/AdminLayout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import AuthLayout from 'components/layout/AuthLayout'
import useApiError from 'hooks/useApiError'

function MyApp({ Component, pageProps }: AppProps) {
  const { handleError } = useApiError();
  const [queryClient] = React.useState(new QueryClient({
    defaultOptions: {
      queries: {
        onError: handleError 
      },
      mutations: {
        onError: handleError
      }
    }
  }));
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthLayout>
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      </AuthLayout>
    </QueryClientProvider>
  );
}

export default MyApp
