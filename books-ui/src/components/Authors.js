import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Loading from './Loading';
import { Table, Button, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState({ message: '', type: '' });

  useEffect(() => {
    setIsLoading(true);

    axios.get('/authors')
      .then(result => {
        setAuthors(result.data);
      })
      .catch(error => {
        console.log(`Error ${error}`);
      })
      .finally(() => setIsLoading(false));
  }, []);

  function handleDeleteClick(e, authorId) {
    const path = `http://localhost:3001/authors/${authorId}`;
    console.log(path);

    axios.delete(path)
      .then(result => {
        setAlert({ message: 'Author successfully deleted.', type: 'success' });
        setAuthors(prev => prev.filter(author => author.id !== authorId));
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <>
      <Row>
        <Col>
          <h2>Authors</h2>
        </Col>
        <Col className='text-end'>
          <Button as={Link} to={'/authors/new'} className='btn-primary'>
            Add Author
          </Button>
        </Col>
      </Row>

      {isLoading === true ?
        <Loading />
      :
        <>
          {alert.message.length > 0 ? <Alert className='text-center' variant={alert.type} dismissible onClose={() => setAlert({ message: '', type: '' })}>{alert.message}</Alert> : null}
          {authors.length > 0 ?
            <Table striped bordered hover className='mt-3'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>First Name</th>
                  <th>Middle Name</th>
                  <th>Last Name</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {authors.map(author => (
                  <tr key={author.id}>
                    <td>{author.id}</td>
                    <td>{author.title}</td>
                    <td>{author.first_name}</td>
                    <td>{author.middle_name}</td>
                    <td>{author.last_name}</td>
                    <td className='text-center'>
                      <Button as={Link} to={`/authors/${author.id}`}>
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                      <Button className='btn-danger ms-1' onClick={(e) => handleDeleteClick(e, author.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          :
            <span>No authors available.</span>
          }
        </>
      }
    </>
  )
}

export default Authors;