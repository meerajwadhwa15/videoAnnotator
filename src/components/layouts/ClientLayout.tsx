import { Container, Row, Col } from 'shards-react';
import Footer from 'components/elements/footer';
import { AuthenticationModule } from 'modules/authentication';

const ClientLayout = ({ children }) => {
  return (
    <Container
      fluid
      className="h-100 pl-0 pr-0"
      style={{ maxWidth: '1920px', border: '1px solid #e1e5eb' }}
    >
      <Row noGutters>
        <Col xs="12">
          <div className="client-navbar">
            <nav>
              <h4>Navbar</h4>
            </nav>
          </div>
        </Col>
        <Col xs="12">{children}</Col>
      </Row>
      <Footer />
      <AuthenticationModule />
    </Container>
  );
};

export default ClientLayout;
