import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './Loading';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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


  return (
    <>
      <h2>Authors</h2>
      {isLoading === true ?
        <Loading />
      :
        <>
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
                    <td><Button as={Link} to={`/authors/${author.id}`}>Edit</Button></td>
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