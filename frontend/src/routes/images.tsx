import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { createFileRoute } from '@tanstack/react-router'

import { fetchImages } from '@/lib/utils/api'

export const Route = createFileRoute('/images')({
  component: AboutComponent,
  loader: () => fetchImages(),
})

function ImagesComponent() {
  return (
    <TableRow>
      <TableCell>INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  )
}
function ImageList() {
  return (
    <div className="p-2">
      <Table>
        <TableCaption>All available images.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Tag</TableHead>
            <TableHead className="text-right">Size</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <ImagesComponent />
        </TableBody>
      </Table>
    </div>
  )
}
function AboutComponent() {
  return (
    <div className="p-2">
      <ImageList />
    </div>
  )
}
