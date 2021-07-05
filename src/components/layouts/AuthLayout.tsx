import { Container, Row, Col } from 'shards-react';

const AuthLayout = ({ children }) => (
  <Container fluid className="h-100 px-4">
    <Row noGutters className="h-100">
      <Col lg="3" md="5" className="auth-form mx-auto my-auto">
        {children}
      </Col>
    </Row>
  </Container>
);

export default AuthLayout;
