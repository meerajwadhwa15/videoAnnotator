import { Container, Row, Col, Navbar } from 'shards-react';
import Footer from 'components/elements/footer';

const ClientLayout = ({ children }) => (
  <Container fluid className="h-100 pl-0 pr-0">
    <Row noGutters>
      <Col xs="12">
        <div className="client-navbar">
          <Navbar style={{ justifyContent: 'center' }} type="light">
            <h4>Homepage</h4>
          </Navbar>
        </div>
      </Col>
      <Col xs="12">{children}</Col>
    </Row>
    <Footer />
  </Container>
);

export default ClientLayout;
