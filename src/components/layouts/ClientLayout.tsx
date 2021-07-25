import { Container, Row, Col, Navbar } from 'shards-react';

const ClientLayout = ({ children }) => (
  <Container fluid className="h-100 pl-0 pr-0">
    <Row noGutters>
      <Col xs="12">
        <div className="client-navbar">
          <Navbar style={{ justifyContent: 'center' }} type="light">
            Sample User Homepage
          </Navbar>
        </div>
      </Col>
      <Col xs="12">{children}</Col>
    </Row>
    <footer
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: '0',
        width: '100%',
        height: '50px',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e0e0e0',
      }}
    >
      <div style={{ color: '#5a5757' }}>Copyright © 2021 Video Annotator</div>
    </footer>
  </Container>
);

export default ClientLayout;
