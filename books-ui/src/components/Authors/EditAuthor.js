import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import Loading from '../Loading';

function EditAuthor() {
  const [isLoading, setIsLoading] = useState(true);
  const [author, setAuthor] = useState({});
  const [alert, setAlert] = useState({ message: '', type: '' })
  const [formData, setFormData] = useState({title: '', first_name: '', middle_name: '', last_name: ''});
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);

    axios.get(`/authors/${id}`)
      .then(result => {
        setAuthor(result.data);
        setFormData({
          title: result.data.title || '',
          first_name: result.data.first_name || '',
          middle_name: result.data.middle_name || '',
          last_name: result.data.last_name || ''
        });
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  function handleSave(e) {
    e.preventDefault();

    axios.put(`/authors/${id}`, formData)
      .then(result => {
        setAlert({ message: 'Author updated successfully.', type: 'success' });
      })
      .catch(error => {
        setAlert({ message: 'Author failed to update.', type: 'danger' });
      });
  }

  return (
    <>
      <h3>Edit Author ({author.id})</h3>

      {isLoading === true ?
        <Loading />
      :
        <>
        {alert.message.length > 0 ? <Alert className='text-center' variant={alert.type} dismissible onClose={() => setAlert({ message: '', type: '' })}>{alert.message}</Alert> : null}
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
            <Button onClick={handleSave}>Save</Button>
            <Button as={Link} to='/authors' className='btn-secondary ms-2'>Cancel</Button>
          </Form.Group>
        </Form>
        </>
      }
    </>
  );
}

export default EditAuthor;