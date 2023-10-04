"use client"
import { Button } from "react-bootstrap"
import Table from "react-bootstrap/Table"

interface Blogs {
  blogs: BlogItem[]
}

const AppTable = ({ blogs }: Blogs) => {
  return (
    <Table bordered hover size="sm">
      <thead>
        <tr>
          <th>Number</th>
          <th>Title</th>
          <th>Author</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {blogs.map((blog) => (
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
  )
}

export default AppTable
