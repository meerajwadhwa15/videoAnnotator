import React, { FC, useState, SyntheticEvent } from 'react';
import { Button } from 'shards-react';
import { useTranslation } from 'next-i18next';

import CommentItem from './CommentItem';
import { VideoInfo, User, CommentsList } from 'models';
import styles from './style.module.scss';

interface Props {
  isLoadingVideo: boolean;
  commentLoading: boolean;
  url: string;
  videoDetail: VideoInfo;
  user: User;
  onPostComment: (commentText: string) => void;
  onEditComment: (id: number, content: string) => void;
  onDeleteComment: (comment: CommentsList) => void;
  onCheckLogin: () => void;
}

const CommentSection: FC<Props> = ({
  isLoadingVideo,
  commentLoading,
  url,
  videoDetail,
  user,
  onPostComment,
  onEditComment,
  onDeleteComment,
  onCheckLogin,
}) => {
  const { t } = useTranslation(['client-video-detail']);
  const [highlightInput, setHighlightInput] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>('');

  function onChangeComment(event) {
    setCommentText(event.target.value);
  }

  function onCheckPostComment(commentText) {
    setTimeout(() => {
      setCommentText('');
    }, 500);
    onPostComment(commentText);
  }

  function onImageError(event: SyntheticEvent<EventTarget>) {
    (event.target as HTMLImageElement).src = '/images/avatar-default.jpg';
  }

  return (
    <React.Fragment>
      {!isLoadingVideo && Object.keys(videoDetail).length > 0 && (
        <div className={styles.commentSection}>
          {!user.email && (
            <div className={styles.commentReqLogin}>
              <span className={styles.checkLogin} onClick={onCheckLogin}>
                {t('loginLink')}
              </span>
              <span> {t('commentReqLogin')}</span>
            </div>
          )}
          <h4 className={styles.commentCount}>
            <span>
              {t('commentCountText', {
                count: videoDetail.userComment?.numberOfComment,
              })}
            </span>
          </h4>
          {user.email && (
            <form>
              <div className={styles.userCommentWrapper}>
                <div className={styles.contentWrap}>
                  <div className={styles.avatarWrapper}>
                    <img
                      src={user.avatar || '/images/avatar-default.jpg'}
                      width={40}
                      height={40}
                      alt="User Avatar"
                      onError={onImageError}
                    />
                  </div>
                  <div className={styles.commentInputWrapper}>
                    <input
                      disabled={commentLoading}
                      className={`${styles.inputRdr} ${
                        highlightInput ? styles.highlightInput : ''
                      }`}
                      type="text"
                      value={commentText}
                      placeholder={t('commentBtnPlaceholder')}
                      onFocus={() => setHighlightInput(true)}
                      onBlur={() => setHighlightInput(false)}
                      onChange={onChangeComment}
                    />
                  </div>
                </div>
                <div className={styles.btnGroupWrapper}>
                  <Button
                    type="submit"
                    disabled={commentLoading || !commentText}
                    onClick={() => onCheckPostComment(commentText)}
                  >
                    {t('commentBtn')}
                  </Button>
                </div>
              </div>
            </form>
          )}
          {videoDetail.userComment.commentList.map((comment) => (
            <CommentItem
              key={comment.id}
              url={url}
              commentLoading={commentLoading}
              comment={comment}
              onEditComment={onEditComment}
              onDeleteComment={onDeleteComment}
            />
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default CommentSection;
