import { CodegenConfig } from '@graphql-codegen/cli'

import dotenv from 'dotenv';

dotenv.config();

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.NEXT_PUBLIC_API_URL,
  documents: ["./**/*.graphql"],
  generates: {
    '__generated__/graphql.ts': {
      config: {
        withHooks: true,
        documentMode: "documentNode"
      },
      plugins: ["typescript", "typescript-operations", "typescript-urql"]
    }
  },
  watchConfig: {
    usePolling: true,
    interval: 1000
  }
}

export default config