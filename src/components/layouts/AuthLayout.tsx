import { Languages } from 'components/elements/footer/Languages';
import { useTranslation } from 'next-i18next';
import { Container, Row, Col } from 'shards-react';

const AuthLayout = ({ children }) => {
  const { t } = useTranslation('common');
  return (
    <Container fluid className="h-100 pl-0 pr-0">
      <Row noGutters className="h-100">
        <Col lg="3" md="5" className="auth-form mx-auto my-auto">
          {children}
        </Col>
      </Row>
      <footer
        style={{
          position: 'fixed',
          bottom: '0',
          width: '100%',
          height: '50px',
          backgroundColor: '#fff',
          borderTop: '1px solid #e0e0e0',
        }}
      >
        <Row>
          <div className="ml-5 mt-1">
            <Languages />
          </div>
          <div className="m-auto">{t('footerCopyright')}</div>
        </Row>
      </footer>
    </Container>
  );
};

export default AuthLayout;
