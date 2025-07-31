// import { Container, Card, Button } from 'react-bootstrap';

// const Hero = () => {
//   return (
//     <div className=' py-5'>
//       <Container className='d-flex justify-content-center'>
//         <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
//           <h1 className='text-center mb-4'>Stockerr</h1>
//           <p className='text-center mb-4'>
//              Manage your stock, pricing, and product records all in one place.
//           </p>
//           <div className='d-flex'>
//             <Button variant='primary' href='/login' className='me-3'>
//               Sign In
//             </Button>
//             <Button variant='secondary' href='/register' className='me-3'>
//               Register
//             </Button>
//             <Button variant='primary' href='/dashboard'>
//               Go to Dashboard
//             </Button>

//           </div>
//         </Card>
//       </Container>
//     </div>
//   );
// };

// export default Hero;




import { Container, Card, Button, Row, Col } from 'react-bootstrap';

const Hero = () => {
  return (
    <div className='py-5 bg-light'>
      <Container>
        <Row className='align-items-center'>
          <Col md={6}>
            <h1 className='mb-4 fw-bold'>Inventory Made Easy 📦</h1>
            <p className='lead'>
              Track stock, manage prices, and streamline your product operations — all from one beautiful dashboard.
            </p>
            <div className='d-flex flex-wrap mt-4'>
              <Button variant='primary' href='/login' className='me-3 mb-2'>
                Sign In
              </Button>
              <Button variant='outline-secondary' href='/register' className='me-3 mb-2'>
                Register
              </Button>
              <Button variant='success' href='/dashboard' className='mb-2'>
                Go to Dashboard
              </Button>
            </div>
          </Col>
          <Col
  md={6}
  className="text-center"
  style={{
    backgroundImage: `url('https://i.pinimg.com/1200x/f4/35/3b/f4353b75aed6fa1eb9f4f04c429b3280.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '300px',
  }}
>
  {/* Optional overlay content */}
</Col>

        </Row>
      </Container>
    </div>
  );
};

export default Hero;
