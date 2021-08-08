import { Container, Row, Col } from 'shards-react';
import { useTranslation } from 'next-i18next';
import Footer from 'components/elements/footer';

const ClientLayout = ({ children }) => {
  const { t } = useTranslation(['client-home']);

  return (
    <Container fluid className="h-100 pl-0 pr-0" style={{ maxWidth: '1920px' }}>
      <Row noGutters>
        <Col xs="12">
          <div className="client-navbar">
            <nav>
              <h4>{t('home')}</h4>
            </nav>
          </div>
        </Col>
        <Col xs="12">{children}</Col>
      </Row>
      <Footer />
    </Container>
  );
};

export default ClientLayout;
