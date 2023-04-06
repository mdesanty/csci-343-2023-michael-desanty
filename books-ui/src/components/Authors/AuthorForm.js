import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

function AuthorForm(props) {
  const [formData, setFormData] = useState({ title: '', first_name: '', middle_name: '', last_name: '' });

  useEffect(() => {
    if(props.author) {
      setFormData({
        title: props.author.title || '',
        first_name: props.author.first_name || '',
        middle_name: props.author.middle_name || '',
        last_name: props.author.last_name || ''
      });
    }
  }, [props.author])

  return(
    <>
      <Form id='author-form' className='mt-3 w-50'>
        <Form.Group className='mt-3'>
          <Form.Label>Title</Form.Label>
          <Form.Control type='text' value={formData.title} placeholder='Enter title' onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
        </Form.Group>
        <Form.Group className='mt-3'>
          <Form.Label>First Name</Form.Label>
          <Form.Control type='text' value={formData.first_name} placeholder='Enter first name' onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} />
        </Form.Group>
        <Form.Group className='mt-3'>
          <Form.Label>Middle Name</Form.Label>
          <Form.Control type='text' value={formData.middle_name} placeholder='Enter middle name' onChange={(e) => setFormData({ ...formData, middle_name: e.target.value })} />
        </Form.Group>
        <Form.Group className='mt-3'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control type='text' value={formData.last_name} placeholder='Enter last name' onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} />
        </Form.Group>
        <Form.Group className='mt-4'>
          <Button onClick={(e) => props.handleSave(e, formData)}>Save</Button>
          <Button as={Link} to='/authors' className='btn-secondary ms-2'>Cancel</Button>
        </Form.Group>
      </Form>
    </>
  );
}

export default AuthorForm;