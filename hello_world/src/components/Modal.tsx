"use client"
import { useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import FormControl from "./Form"
import { toast } from "sonner"

export type FormData = Omit<BlogItem, "id">

function CreateModal() {
  const [show, setShow] = useState(false)

  const initData: FormData = {
    author: "",
    content: "",
    title: ""
  }

  const [formData, setFormData] = useState<FormData>(initData)

  const handleClose = () => {
    setShow(false)
    setFormData(initData)
  }
  const handleShow = () => {
    setShow(true)
  }

  const handleSubmit = () => {
    console.log(formData)
    toast.success("My success toast")
  }

  return (
    <>
      <Button onClick={handleShow} variant="secondary">
        Add New
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
