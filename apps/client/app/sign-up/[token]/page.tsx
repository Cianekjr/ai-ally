import { urqlClient } from "@integrations/urql";
import { withUrqlClient } from "next-urql";
import { ActivateDocument } from "__generated__/graphql.server";
import ActivationView from "./ActivationView";

import { initUrqlClient } from 'next-urql';
import { print } from "graphql";

// const client = initUrqlClient(
//   {
//     url: '/graphql',
//   },
//   true
// );

        async function Page() {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: print(ActivateDocument),
    }),
    credentials: 'include'
  })

const data = await res.json()
console.log(data)

  // const result = await urqlClient.mutation<ActivateMutation>(ActivateDocument, { token }).toPromise()
  // const result = await urqlClient.mutation(ActivateDocument, { token }).toPromise()


  // const result = await client?.mutation(ActivateDocument, { token }).toPromise();

  // console.log(result)

  // if (!result.data) {
  //   throw new Error('Internal error. Status cannot be obtained.')
  // }

  // const status = result.data.activate.status

  return <ActivationView status={"SUCCESS"} />
}

export default Page