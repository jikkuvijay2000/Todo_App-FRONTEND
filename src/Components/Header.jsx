import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Header() {
  const [cookies, setCookies, removeCookies] = useCookies(['access_token']);
  const navigate = useNavigate();

  const logout = () => {
    removeCookies('access_token');
    window.localStorage.removeItem('userID');
   
    

      navigate('/')          
 
      toast.success('You have been logged out! See you soon!');
  };

  return (
    <div>
      <Navbar className="bg-dark">
        <Container fluid>
          <Navbar.Brand>
            <b className='text-white'><i className="fa-solid fa-check"></i> TODO</b>
          </Navbar.Brand>
          {cookies.access_token && (
            <Nav className="ms-auto">
              <button onClick={logout} className='btn btn-danger'>Logout</button>
            </Nav>
          )}
        </Container>
      </Navbar>

      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}

export default Header;
