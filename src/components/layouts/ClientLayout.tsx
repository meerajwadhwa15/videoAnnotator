import { Container, Row, Col, Popover } from 'shards-react';
import Link from 'next/link';
import Footer from 'components/elements/footer';
import { AuthenticationModule } from 'modules/authentication';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { userDataSelector } from 'redux/globalSlice';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { clientCookies } from 'utils/clientCookies';
import { toggleLoginDialog } from 'modules/authentication/slice';

const ClientLayout = ({ children }) => {
  const user = useAppSelector(userDataSelector);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
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
            zIndex: 1,
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
            {user.email ? (
              <span className="ml-auto d-flex align-items-center pl-2 border-left h-100">
                <img
                  className="rounded-circle user-avatar inline-block"
                  src={user.avatar || '/images/avatar-default.jpg'}
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
                  <Link href="/profile">
                    <a className="px-4 py-2 cursor-pointer d-block popup-link">
                      {t('common:profile')}
                    </a>
                  </Link>
                  <div
                    onMouseDown={handleLogout}
                    className="px-4 py-2 cursor-pointer popup-link"
                  >
                    {t('common:logoutLink')}
                  </div>
                </Popover>
              </span>
            ) : (
              <span
                onClick={() => dispatch(toggleLoginDialog())}
                className="ml-auto cursor-pointer hover-underline"
              >
                {t('common:loginOrSignup')}
              </span>
            )}
          </nav>
        </Col>
        <Col xs="12">{children}</Col>
      </Row>
      <Footer />
      <AuthenticationModule />
      <style>
        {`
          .popup-link:hover {
              text-decoration: none;
              color: black;
              background: #ececec;
            }
        `}
      </style>
    </Container>
  );
};

export default ClientLayout;
