"use client"
import Form from "react-bootstrap/Form"
import { FormData } from "./Modal"
import { Dispatch, SetStateAction } from "react"

interface FormControlPropTypes {
  data: FormData
  setForm: Dispatch<SetStateAction<FormData>>
}

function FormControl({ data, setForm }: FormControlPropTypes) {
  const handleChange =
    (label: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [label]: e.target.value // Use square brackets to access object properties with a dynamic key
      }))
    }
  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Title"
          onChange={handleChange("title")}
          value={data.title}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Author"
          onChange={handleChange("author")}
          value={data.author}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          onChange={handleChange("content")}
          value={data.content}
        />
      </Form.Group>
    </Form>
  )
}

export default FormControl
