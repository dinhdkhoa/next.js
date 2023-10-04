"use client"
import { Button } from "react-bootstrap"
import Table from "react-bootstrap/Table"
import TableSkeleton from "./TableSkeleton"
import useSWR from "swr"
import CreateModal from "./Modal"

const fetcher: (url: string) => Promise<any> = (url: string) =>
  fetch(url).then((res) => res.json())

export default function AppTable() {
  const { data, error, isLoading } = useSWR<BlogItem[]>(
    "http://localhost:8000/blogs",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )
  return (
    <>
      <div
        className="mt-3 mb-3"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h3>Table Blogs</h3>
        {!isLoading && <CreateModal />}
      </div>
      <Table bordered hover size="sm" className="mt-3">
        <thead>
          <tr>
            <th>Number</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && <TableSkeleton />}
          {!isLoading &&
            !(!data || data.length === 0) &&
            data.map((blog) => (
              <tr key={blog.id}>
                <td>{blog.id}</td>
                <td>{blog.title}</td>
                <td>{blog.author}</td>
                <td>
                  <Button>View</Button>
                  <Button variant="warning">Edit</Button>
                  <Button variant="danger">Delete</Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  )
}
