import styles from './style.module.scss';

export const SideBar = () => {
  return (
    <nav className={styles.sidebar}>
      <ul>
        <li className="active">
          <i className="material-icons mr-2">home</i>
          Home Page
        </li>
        <li>
          <i className="material-icons mr-2">watch_later</i>
          <span>Watch Later</span>
        </li>
        <li>
          <i className="material-icons mr-2">favorite_border</i>
          <span>Favorites</span>
        </li>
      </ul>
      <style jsx>
        {`
          ul {
            padding: 0;
            list-style: none;
          }
          li {
            padding: 12px 24px;
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
