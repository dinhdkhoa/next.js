"use client"

import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
export default function TableSkeleton() {
  return (
    <>
      <tr>
        <td>
          <Skeleton />
        </td>
        <td>
          <Skeleton />
        </td>
        <td>
          <Skeleton />
        </td>
        <td>
          <Skeleton />
        </td>
      </tr>
      <tr>
        <td>
          <Skeleton />
        </td>
        <td>
          <Skeleton />
        </td>
        <td>
          <Skeleton />
        </td>
        <td>
          <Skeleton />
        </td>
      </tr>
      <tr>
        <td>
          <Skeleton />
        </td>
        <td>
          <Skeleton />
        </td>
        <td>
          <Skeleton />
        </td>
        <td>
          <Skeleton />
        </td>
      </tr>
    </>
  )
}
