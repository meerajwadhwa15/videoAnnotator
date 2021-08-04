import { useState } from 'react';
import Link from 'next/link';
import { Popover } from 'shards-react';
import { useRouter } from 'next/router';
import style from './style.module.scss';
import classNames from 'classnames';

export const Languages = () => {
  const [open, setOpen] = useState(false);
  const { asPath, locale } = useRouter();

  const toggle = () => {
    setOpen((prevState) => !prevState);
  };

  const languages = [
    {
      label: 'Tiếng Việt',
      value: 'vi',
    },
    {
      label: 'English',
      value: 'en',
    },
  ];

  const currentLang = locale === 'vi' ? 'Vietnamese' : 'English';

  return (
    <div>
      <div className={style.toggleLanguages} id="popover-1" onClick={toggle}>
        <i className="material-icons mr-2">language</i>
        {currentLang}
      </div>
      <Popover
        className={style.languagePopup}
        placement="top"
        toggle={toggle}
        open={open}
        target="#popover-1"
      >
        <div className={style.selectBody}>
          {languages.map((it) => (
            <div
              key={it.value}
              className={classNames({
                [style.active]: locale === it.value,
              })}
            >
              <Link href={asPath} locale={it.value}>
                {it.label}
              </Link>
            </div>
          ))}
        </div>
      </Popover>
    </div>
  );
};
