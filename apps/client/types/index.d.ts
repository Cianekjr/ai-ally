declare global {
  interface Window { __URQL_DATA__: unknown }
}

window.__URQL_DATA__ = window.__URQL_DATA__ || {}

export interface CustomWindow extends Window {
  __URQL_DATA__: unknown
}
