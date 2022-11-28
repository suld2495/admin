import '../styles/reset.scss'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import AdminLayout from '../components/admin/layout/AdminLayout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <QueryClientProvider client={queryClient}>
      <AdminLayout>
        <Component {...pageProps} />
      </AdminLayout>
    </QueryClientProvider>
  );
}

export default MyApp
