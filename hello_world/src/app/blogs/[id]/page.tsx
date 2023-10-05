"use client"
import Link from "next/link"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import useSWR, { Fetcher } from "swr"

const fetcher: Fetcher<BlogItem, string> = (url: string) =>
  fetch(url).then((res) => res.json())

function BlogDetail({ params }: { params: { id: string } }) {
  //lấy params trong nextjs
  const {
    data: blog,
    error,
    isLoading
  } = useSWR<BlogItem>(`http://localhost:8000/blogs/${params.id}`, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false //automatically revalidate even if there is stale data
  })
  if (blog == undefined) {
    return <>No data</>
  }
  return (
    <>
      <div
        className="mt-3 mb-3"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Link href={"/"}>Go Back</Link>
      </div>
      <Card className="text-center">
        <Card.Header>Title: {blog.title}</Card.Header>
        <Card.Body>
          <Card.Text>{blog.content}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">By: {blog.author}</Card.Footer>
      </Card>
    </>
  )
}

export default BlogDetail
