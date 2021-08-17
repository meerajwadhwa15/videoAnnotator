import { Container, Row, Col } from 'shards-react';
import Footer from 'components/elements/footer';
import { AuthenticationModule } from 'modules/authentication';

const ClientLayout = ({ children }) => {
  return (
    <Container
      fluid
      className="pl-0 pr-0"
      style={{ maxWidth: '1920px', border: '1px solid #e1e5eb' }}
    >
      <Row noGutters>
        <Col
          xs="12"
          style={{
            position: 'sticky',
            top: 0,
            left: 0,
            zIndex: 999,
            background: 'white',
          }}
        >
          <nav className="client-navbar cursor-pointer pl-3 d-flex align-items-center col-xs-12">
            <img alt="logo" src="/logo.png" />
          </nav>
        </Col>
        <Col xs="12">{children}</Col>
      </Row>
      <Footer />
      <AuthenticationModule />
    </Container>
  );
};

export default ClientLayout;
