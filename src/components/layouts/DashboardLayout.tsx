import { Container, Row, Col } from 'shards-react';
import Sidebar from 'components/elements/sidebar';
import Navbar from 'components/elements/navbar';
import Footer from 'components/elements/footer';

const DashboardLayout = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        <Sidebar />
        <Col
          className="main-content p-0"
          lg={{ size: 10, offset: 2 }}
          md={{ size: 9, offset: 3 }}
          sm="12"
          tag="main"
        >
          <Navbar />
          <Container fluid className="main-content-container px-4">
            <Row noGutters className="page-header py-4">
              {children}
            </Row>
          </Container>
          <Footer />
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardLayout;