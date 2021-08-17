import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Row, Col, Card, CardTitle, CardImg, CardBody } from 'shards-react';
import { useTranslation } from 'next-i18next';
import { useAppSelector } from 'redux/hooks';
import { videosListSelector } from './slice';
import { CLIENT_ROUTING } from 'utils/constants';
import styles from './style.module.scss';

export const VideoList = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const videosData = useAppSelector(videosListSelector);

  return (
    <div className={styles.listWrapper}>
      {!videosData ||
        (Array.isArray(videosData) && videosData.length == 0 && (
          <h5 className="text-center mt-4">
            {t('client-video-detail:noVideo')}
          </h5>
        ))}
      {Array.isArray(videosData) && videosData.length > 0 && (
        <React.Fragment>
          <Row>
            {videosData.map((data) => (
              <Col xl="3" lg="3" sm="4" xs="12" key={data.id}>
                <Link
                  href={`${CLIENT_ROUTING.videoDetail}/${data.id}`}
                  locale={router.locale}
                >
                  <a className={styles.videoItem}>
                    <Card className={styles.card}>
                      <div className={styles.imgWrapper}>
                        <CardImg
                          src={
                            data.thumbnail || 'https://place-hold.it/300x300'
                          }
                        />
                      </div>
                      <CardBody className={styles.cardBody}>
                        <CardTitle>{data.name}</CardTitle>
                        <p title={data.description} className={styles.cardDes}>
                          {data.description}
                        </p>
                      </CardBody>
                    </Card>
                  </a>
                </Link>
              </Col>
            ))}
          </Row>
        </React.Fragment>
      )}
    </div>
  );
};
