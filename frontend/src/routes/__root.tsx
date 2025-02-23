import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <div className="p-2 flex gap-2 text-lg">
        <Link
          to="/"
          activeProps={{
            className: 'font-bold',
          }}
          activeOptions={{ exact: true }}
        >
          Dashboard
        </Link>{' '}
        <Link
          to="/images"
          activeProps={{
            className: 'font-bold',
          }}
        >
          Images
        </Link>
        <Link
          to="/containers"
          activeProps={{
            className: 'font-bold',
          }}
        >
          Containers
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
