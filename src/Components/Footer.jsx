import React from 'react'
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';

function Footer() {
  return (
    <div>

<MDBFooter className='bg-dark mt-5 text-center text-white mt-5 fixed-bottom' >
     

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2024 Copyright:
        <a className='text-white' href='https://mdbootstrap.com/'>
          Jikku Vijay
        </a>
      </div>
    </MDBFooter>
    </div>
  )
}

export default Footer