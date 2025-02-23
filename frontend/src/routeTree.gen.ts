/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ImagesImport } from './routes/images'
import { Route as ContainersImport } from './routes/containers'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const ImagesRoute = ImagesImport.update({
  id: '/images',
  path: '/images',
  getParentRoute: () => rootRoute,
} as any)

const ContainersRoute = ContainersImport.update({
  id: '/containers',
  path: '/containers',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/containers': {
      id: '/containers'
      path: '/containers'
      fullPath: '/containers'
      preLoaderRoute: typeof ContainersImport
      parentRoute: typeof rootRoute
    }
    '/images': {
      id: '/images'
      path: '/images'
      fullPath: '/images'
      preLoaderRoute: typeof ImagesImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/containers': typeof ContainersRoute
  '/images': typeof ImagesRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/containers': typeof ContainersRoute
  '/images': typeof ImagesRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/containers': typeof ContainersRoute
  '/images': typeof ImagesRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/containers' | '/images'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/containers' | '/images'
  id: '__root__' | '/' | '/containers' | '/images'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ContainersRoute: typeof ContainersRoute
  ImagesRoute: typeof ImagesRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ContainersRoute: ContainersRoute,
  ImagesRoute: ImagesRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/containers",
        "/images"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/containers": {
      "filePath": "containers.tsx"
    },
    "/images": {
      "filePath": "images.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
