import classNames from 'classnames';
import { useRouter } from 'next/router';
import toString from 'lodash/toString';
import styles from './style.module.scss';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { toggleLoginDialog } from 'modules/authentication/slice';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

const data = [
  {
    label: 'common:home',
    icon: 'home',
  },
  {
    id: 1,
    label: 'common:favorite',
    icon: 'favorite_border',
  },

  {
    id: 2,
    label: 'common:watchLater',
    icon: 'watch_later',
  },
];

export const SideBar = () => {
  const { query, push, pathname } = useRouter();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.app.user);
  const hasLogin = user && user.email;
  const { playlist } = query;

  const handleClick = (id: any) => {
    if (hasLogin) {
      push({
        pathname,
        query: id ? { playlist: id } : {},
      });
    } else {
      dispatch(toggleLoginDialog());
    }
  };

  return (
    <nav className={styles.sidebar} style={{ width: open ? '240px' : 'auto' }}>
      <span className="toggle">
        <i
          onClick={() => setOpen(!open)}
          className="material-icons cursor-pointer"
        >
          {open ? 'menu_open' : 'menu'}
        </i>
      </span>
      <ul className="mt-4">
        {data.map((it) => (
          <li
            className={classNames({
              active: toString(playlist) == toString(it.id),
            })}
            onClick={() => handleClick(it.id)}
            key={it.icon}
          >
            <i className="material-icons">{it.icon}</i>
            {open && <span className="ml-2">{t(it.label)}</span>}
          </li>
        ))}
      </ul>
      <style jsx>
        {`
          ul {
            padding: 0;
            list-style: none;
          }
          span.toggle,
          li {
            padding: 12px 24px;
          }
          li {
            cursor: pointer;
            border-bottom: 1px solid #eaeaea;
          }
          li.active,
          li:hover {
            background: #eaeaea;
          }
        `}
      </style>
    </nav>
  );
};
