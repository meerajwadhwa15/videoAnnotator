import { Container, Row, Col, Popover } from 'shards-react';
import Link from 'next/link';
import Footer from 'components/elements/footer';
import { AuthenticationModule } from 'modules/authentication';
import { useAppSelector } from 'redux/hooks';
import { userDataSelector } from 'redux/globalSlice';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { clientCookies } from 'utils/clientCookies';

const ClientLayout = ({ children }) => {
  const user = useAppSelector(userDataSelector);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleLogout = () => {
    clientCookies.deleteSession();
    window.location.reload();
  };

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
          <nav className="client-navbar px-3 d-flex align-items-center col-xs-12">
            <Link href="/">
              <a>
                <img
                  className="cursor-pointer logo"
                  alt="logo"
                  src="/logo.png"
                />
              </a>
            </Link>
            {user.email && (
              <span className="ml-auto d-flex align-items-center pl-2 border-left h-100">
                <Image
                  className="rounded-circle inline-block"
                  src="/images/avatar-default.jpg"
                  width={40}
                  height={40}
                  alt="User Avatar"
                />
                <span
                  onClick={() => setOpen(!open)}
                  id="user-name"
                  className="ml-3 d-flex align-items-center text-sm cursor-pointer"
                >
                  <span>{user.fullName}</span>
                  <i className="material-icons ml-1" style={{ fontSize: 24 }}>
                    arrow_drop_down
                  </i>
                </span>
                <Popover
                  placement="bottom"
                  open={open}
                  toggle={() => setOpen(!open)}
                  target="#user-name"
                >
                  <div
                    onMouseDown={handleLogout}
                    className="px-4 py-2 cursor-pointer"
                  >
                    {t('common:logoutLink')}
                  </div>
                </Popover>
              </span>
            )}
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
