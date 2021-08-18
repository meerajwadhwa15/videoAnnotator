import classNames from 'classnames';
import { Playlist, VideoInfo } from 'models';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Col, Card, CardImg, CardBody, CardTitle, Popover } from 'shards-react';
import { CLIENT_ROUTING } from 'utils/constants';
import _groupBy from 'lodash/groupBy';
import styles from './style.module.scss';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { dispatchUpdatePlaylist } from './slice';
import { toggleLoginDialog } from 'modules/authentication/slice';
import { useTranslation } from 'next-i18next';

export const VideoItem = ({ data }: { data: VideoInfo }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.app.user);
  const id = `video-${data.id}`;

  const playlists = _groupBy(data.playlists, 'name');

  const favorite: Playlist = playlists.Favorite[0];
  const watchLater: Playlist = playlists['Watch Later'][0];

  const toggle = () => setOpen(!open);

  const handleClick = () => {
    if (!user.email) {
      return dispatch(toggleLoginDialog());
    } else {
      toggle();
    }
  };

  const toggleWatchLater = () => {
    const result = [
      favorite,
      { ...watchLater, selected: !watchLater.selected },
    ];
    dispatch(
      dispatchUpdatePlaylist({
        videoId: data.id,
        data: result,
      })
    );
  };

  const toggleFavorite = () => {
    const result = [{ ...favorite, selected: !favorite.selected }, watchLater];
    dispatch(
      dispatchUpdatePlaylist({
        videoId: data.id,
        data: result,
      })
    );
  };

  return (
    <Col xl="3" lg="3" sm="4" xs="12" key={data.id}>
      <a className={styles.videoItem}>
        <Card className={styles.card}>
          <Link
            passHref
            href={`${CLIENT_ROUTING.videoDetail}/${data.id}`}
            locale={router.locale}
          >
            <div className={styles.imgWrapper}>
              <CardImg src={data.thumbnail} />
            </div>
          </Link>
          <CardBody className="p-3 d-flex justify-content-between">
            <Link
              passHref
              href={`${CLIENT_ROUTING.videoDetail}/${data.id}`}
              locale={router.locale}
            >
              <div>
                <CardTitle>{data.name}</CardTitle>
                <p title={data.description} className={styles.cardDes}>
                  {data.description}
                </p>
              </div>
            </Link>
            <span
              onClick={handleClick}
              className={styles.cardMoreAction}
              id={id}
            >
              <i className="material-icons">more_vert</i>
            </span>
            <Popover
              target={`#${id}`}
              open={open}
              placement="bottom-right"
              toggle={toggle}
            >
              <div className={classNames('py-1 shadow', styles.dropDownMenu)}>
                <div
                  onMouseUp={toggleFavorite}
                  className="py-1 px-3 cursor-pointer"
                >
                  {favorite.selected
                    ? t('client-home:removeFavorite')
                    : t('client-home:addToFavorite')}
                </div>
                <div
                  onMouseUp={toggleWatchLater}
                  className="py-1 px-3 pt-1 cursor-pointer"
                >
                  {watchLater.selected
                    ? t('client-home:removeWatchLater')
                    : t('client-home:addToWatchLater')}
                </div>
              </div>
            </Popover>
          </CardBody>
        </Card>
      </a>
    </Col>
  );
};
