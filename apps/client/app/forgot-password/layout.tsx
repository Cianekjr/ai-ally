import Layout from '@components/Layout'

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>
}

export const metadata = {
  title: 'new metadata',
}
