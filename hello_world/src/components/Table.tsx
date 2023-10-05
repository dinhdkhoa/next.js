"use client"
import { Button } from "react-bootstrap"
import Table from "react-bootstrap/Table"
import TableSkeleton from "./TableSkeleton"
import useSWR, { mutate } from "swr"
import CreateModal from "./Modal"
import { toast } from "sonner"

const fetcher: (url: string) => Promise<any> = (url: string) =>
  fetch(url).then((res) => res.json())

const deleteAPI = (id: number) => {
  try {
    fetch(`http://localhost:8000/blogs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
      .then((res) => res.json())
      .then((res) => {
        mutate("http://localhost:8000/blogs")
      })
  } catch (error) {
    console.log(error)
  }
}

export default function AppTable() {
  const { data, error, isLoading } = useSWR<BlogItem[]>(
    "http://localhost:8000/blogs",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false //automatically revalidate even if there is stale data
    }
  )

  const handleDelete = async (id: number) => {
    try {
      await deleteAPI(id)
      toast.success("Blog deleted successfully.")
    } catch (error) {
      console.error("Error deleting form:", error)
      toast.error("An error occurred while deleting the form")
    }
  }
  return (
    <>
      <div
        className="mt-3 mb-3"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h3>Table Blogs</h3>
        {!isLoading && <CreateModal mode="add" />}
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
            data
              .sort((a, b) => b.id - a.id)
              .map((blog) => (
                <tr key={blog.id}>
                  <td>{blog.id}</td>
                  <td>{blog.title}</td>
                  <td>{blog.author}</td>
                  <td>
                    <Button>View</Button>
                    <CreateModal mode="edit" blog={blog} />
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(blog.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>
    </>
  )
}
