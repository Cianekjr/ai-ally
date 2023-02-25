import { ActivateDocument, ActivateMutation } from '__generated__/graphql.server'
import ActivationView from './ActivationView'

import { urqlClient } from '@integrations/urql'

export const revalidate = 0

async function Page({ params }: { params: { token: string } }) {
  const { data, error } = await urqlClient.mutation<ActivateMutation>(ActivateDocument, { token: params.token }).toPromise()

  if (error || !data?.activate.status) {
    throw new Error(`Internal error. Status cannot be obtained. - ${error}`)
  }

  return <ActivationView status={data?.activate.status} />
}

export default Page
