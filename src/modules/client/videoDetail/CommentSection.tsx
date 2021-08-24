import React, { FC, useState, SyntheticEvent } from 'react';
import { Button } from 'shards-react';
import { useTranslation } from 'next-i18next';

import { VideoInfo, User, CommentsList } from 'models';
import styles from './style.module.scss';

interface Props {
  isLoadingVideo: boolean;
  commentLoading: boolean;
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
  const [isEditMode, setEditMode] = useState<any>({ id: -1, content: '' });

  function onChangeComment(event) {
    setCommentText(event.target.value);
  }

  function openEditMode(comment) {
    setEditMode({ id: comment.id, content: comment.content });
  }

  function closeEditMode() {
    setEditMode({ id: -1, content: '' });
  }

  function onChangeInnerComment(event) {
    setEditMode({
      ...isEditMode,
      content: event.target.value,
    });
  }

  function onCheckPostComment(commentText) {
    setTimeout(() => {
      setCommentText('');
    }, 500);
    onPostComment(commentText);
  }

  function onCheckInnerEditComment(id, content) {
    setEditMode({ id: -1, content: '' });
    onEditComment(id, content);
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
          {Array.isArray(videoDetail.userComment?.commentList) &&
            videoDetail.userComment?.commentList?.length > 0 &&
            videoDetail.userComment?.commentList?.map((comment) => (
              <div className={styles.commentItemWrapper} key={comment.id}>
                <div className={styles.avatarWrapper}>
                  <img
                    src={comment.avatar || '/images/avatar-default.jpg'}
                    width={40}
                    height={40}
                    alt="User Avatar"
                    onError={onImageError}
                  />
                </div>
                {isEditMode.id === comment.id ? (
                  <React.Fragment>
                    <div className={styles.commentInputWrapper}>
                      <input
                        className={`${styles.inputRdr} ${styles.highlightInput}`}
                        type="text"
                        value={isEditMode.content || ''}
                        placeholder={t('commentBtnPlaceholder')}
                        onChange={onChangeInnerComment}
                      />
                    </div>
                    <div className={styles.btnInnerCommentWrapper}>
                      <Button
                        type="button"
                        theme="outline"
                        size="sm"
                        onClick={closeEditMode}
                      >
                        {t('addToCancelBtn')}
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        disabled={commentLoading || !isEditMode.content}
                        onClick={() =>
                          onCheckInnerEditComment(
                            isEditMode.id,
                            isEditMode.content
                          )
                        }
                      >
                        {t('addToSubmitBtn')}
                      </Button>
                    </div>
                  </React.Fragment>
                ) : (
                  <div className={styles.commentMetaInfo}>
                    <div className={styles.infoWrapper}>
                      <div className={styles.textInfo}>
                        <span className={styles.commentName}>
                          {comment.userName}
                        </span>
                        <span className={styles.commentTime}></span>
                      </div>
                      {comment.canEdit && (
                        <div className={styles.btnInfo}>
                          <button title={t('editCommentTooltip')}>
                            <i
                              className="material-icons"
                              onClick={() => openEditMode(comment)}
                            >
                              mode_edit
                            </i>
                          </button>
                          <button title={t('deleteCommentTooltip')}>
                            <i
                              className="material-icons"
                              onClick={() => onDeleteComment(comment)}
                            >
                              delete
                            </i>
                          </button>
                        </div>
                      )}
                    </div>
                    <p className={styles.commentContent}>{comment.content}</p>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default CommentSection;