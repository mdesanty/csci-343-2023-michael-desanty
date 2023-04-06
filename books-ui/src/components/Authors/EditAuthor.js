import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import axios from 'axios';
import Loading from '../Loading';
import AuthorForm from './AuthorForm';

function EditAuthor() {
  const [isLoading, setIsLoading] = useState(true);
  const [author, setAuthor] = useState({});
  const [alert, setAlert] = useState({ message: '', type: '' });
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);

    axios.get(`/authors/${id}`)
      .then(result => {
        setAuthor(result.data);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  function handleSave(e, formData) {
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
          <AuthorForm handleSave={handleSave} author={author} />
        </>
      }
    </>
  );
}

export default EditAuthor;