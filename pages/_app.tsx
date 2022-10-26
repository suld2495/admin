import '../styles/reset.scss'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import AdminLayout from '../components/admin/layout/AdminLayout'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <AdminLayout>
      <Component {...pageProps} />
    </AdminLayout>
  );
}

export default MyApp
