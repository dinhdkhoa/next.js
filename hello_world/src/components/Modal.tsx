"use client"
import { useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import FormControl from "./Form"
import { toast } from "sonner"
import { mutate } from "swr"

export type FormData = Omit<BlogItem, "id">

interface PropsType {
  mode: "add" | "edit"
  blog?: BlogItem
}

const postAPI = (postBody: FormData) => {
  try {
    fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(postBody)
    })
      .then((res) => res.json())
      .then((res) => mutate("http://localhost:8000/blogs"))
  } catch (error) {
    console.log(error)
  }
}
const putAPI = (postBody: FormData, id: number) => {
  try {
    fetch(`http://localhost:8000/blogs${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(postBody)
    })
      .then((res) => res.json())
      .then((res) => {
        mutate("http://localhost:8000/blogs")
      })
  } catch (error) {
    console.log(error)
  }
}

function CreateModal({ mode, blog }: PropsType) {
  const [show, setShow] = useState(false)
  let initData: FormData =
    mode == "add"
      ? {
          author: "",
          content: "",
          title: ""
        }
      : ({ ...blog } as FormData)

  const [formData, setFormData] = useState<FormData>(initData)

  const handleClose = () => {
    setShow(false)
    if (mode === "add") {
      setFormData(initData)
    }
  }
  const handleShow = () => {
    setShow(true)
  }

  const handleSubmit = async () => {
    // check empty field
    for (const key in formData) {
      const value = formData[key as keyof FormData]

      if (typeof value === "string" && value.trim() === "") {
        toast.error("No Empty Field")
        return
      }
    }
    try {
      if (mode == "add") {
        await postAPI(formData)
      } else {
        await putAPI(formData, blog?.id as number)
      }
      toast.success("Form submitted successfully")
    } catch (error) {
      console.error("Error submitting form:", error)
      if (mode == "edit") {
        setFormData({ ...blog } as FormData)
      }
      toast.error("An error occurred while submitting the form")
    }
    handleClose()
  }

  return (
    <>
      <Button
        onClick={handleShow}
        variant={mode == "add" ? "secondary" : "warning"}
      >
        {mode == "add" ? "Add New" : "Edit"}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl data={formData} setForm={setFormData} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CreateModal
