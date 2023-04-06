import { Alert } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthorForm from './AuthorForm';
import axios from "axios";

function NewAuthor() {
  const [alert, setAlert] = useState({ message: '', type: '' })
  const navigate = useNavigate();

  function handleSave(e, formData) {
    axios.post('/authors', formData)
      .then(result => {
        navigate('/authors');
      })
      .catch(error => {
        setAlert({ message: 'Failed to create author', type: 'danger' });
      })
  }

  return (
    <>
      <h3>New Author</h3>
      {alert.message.length > 0 ? <Alert className='text-center' variant={alert.type} dismissible onClose={() => setAlert({ message: '', type: '' })}>{alert.message}</Alert> : null}
      <AuthorForm handleSave={handleSave} />
    </>
  )
}

export default NewAuthor;