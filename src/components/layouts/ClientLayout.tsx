import { Container, Row, Col } from 'shards-react';

const ClientLayout = ({ children }) => (
  <Container fluid className="h-100 pl-0 pr-0">
    <Row noGutters className="h-100">
      <Col lg="3" md="5" className="mx-auto my-auto">
        {children}
      </Col>
    </Row>
    <footer
      style={{
        position: 'fixed',
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
