import { headers } from 'next/headers'
import { GetProfileDocument, GetProfileQuery } from '__generated__/graphql.server'

import { urqlClient } from '@integrations/urql'

export const revalidate = 0

async function Page() {
  const headersList = headers()
  const cookiesList = headers().get('cookie')

  console.info(headersList, cookiesList)
  const { data, error } = await urqlClient.query<GetProfileQuery>(GetProfileDocument, {}, { fetchOptions: { headers: { cookie: cookiesList || '' } } }).toPromise()
  console.info(data, error)

  if (error || !data?.getProfile) {
    throw new Error(`Internal error. Status cannot be obtained. - ${error}`)
  }

  return (
    <div>
      <h1>My profile</h1>
      <h3>Email: {data.getProfile.email}</h3>
    </div>
  )
}

export default Page
