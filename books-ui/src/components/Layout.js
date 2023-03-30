import { Container, Nav } from 'react-bootstrap';
import { NavLink, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <Container id='layout'>
      <div className='p-5 mb-4 bg-dark text-white rounded-3'>
        <h1 className='fw-bold'>Mike's Library</h1>
        <span>No membership required!</span>
        <Nav className='bg-secondary'>
          <Nav.Link as={NavLink} to='/'>Home</Nav.Link>
          <Nav.Link as={NavLink} to='/authors'>Authors</Nav.Link>
          <Nav.Link as={NavLink} to='/books'>Books</Nav.Link>
        </Nav>
      </div>
      <div>
        <Outlet />
      </div>
    </Container>
  );
}

export default Layout;