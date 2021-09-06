import React, { FC, useState, useRef, SyntheticEvent } from 'react';
import { Button } from 'shards-react';
import { useTranslation } from 'next-i18next';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

import { CommentsList } from 'models';
import styles from './style.module.scss';

interface Props {
  commentLoading: boolean;
  comment: CommentsList;
  url: string;
  onEditComment: (id: number, content: string) => void;
  onDeleteComment: (comment: CommentsList) => void;
}

const CommentItem: FC<Props> = ({
  commentLoading,
  comment,
  url,
  onEditComment,
  onDeleteComment,
}) => {
  const { t } = useTranslation(['client-video-detail']);
  const [isEditMode, setEditMode] = useState<any>({ id: -1, content: '' });
  const [isPopoverOpen, setPopover] = useState<boolean>(false);
  const ref = useRef<any>(null);

  // useEffect(() => {
  // 	function handleClickOutside(event) {
  // 			if (ref.current && !ref.current.contains(event.target)) {
  // 					togglePopover();
  //       }
  //   }

  // 	document.addEventListener("mousedown", handleClickOutside);
  // 	return () => {
  // 		document.removeEventListener('mousedown', handleClickOutside);
  // 	};
  // 	// eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [ref]);

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

  function onCheckInnerEditComment(id, content) {
    setEditMode({ id: -1, content: '' });
    onEditComment(id, content);
  }

  function onImageError(event: SyntheticEvent<EventTarget>) {
    (event.target as HTMLImageElement).src = '/images/avatar-default.jpg';
  }

  function togglePopover() {
    setPopover(!isPopoverOpen);
  }

  return (
    <React.Fragment>
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
                  onCheckInnerEditComment(isEditMode.id, isEditMode.content)
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
                <span className={styles.commentName}>{comment.userName}</span>
                <span className={styles.time}>
                  {t('onTime')} {new Date(comment.createTime).toLocaleString()}
                </span>
              </div>
              {comment.canEdit && (
                <React.Fragment>
                  <div className={styles.commentSettingWrapper}>
                    <FacebookShareButton
                      url={url}
                      quote={`${comment.content}`}
                      hashtag={`#${comment.userName}`}
                    >
                      <FacebookIcon size={24} round />
                    </FacebookShareButton>
                    <TwitterShareButton url={url} title={`${comment.content}`}>
                      <TwitterIcon size={24} round />
                    </TwitterShareButton>
                    <WhatsappShareButton url={url} title={`${comment.content}`}>
                      <WhatsappIcon size={24} round />
                    </WhatsappShareButton>
                    <div
                      className={styles.addVert}
                      onClick={togglePopover}
                      ref={ref}
                    >
                      <i className="material-icons">more_vert</i>
                      <div
                        className={`${styles.popoverWrapper} ${
                          isPopoverOpen ? styles.popoverOpen : ''
                        }`}
                      >
                        <div className={styles.item}>
                          <button
                            title={t('editCommentTooltip')}
                            onMouseUp={() => openEditMode(comment)}
                          >
                            <i className="material-icons">mode_edit</i>
                            <span>{t('editCommentTooltip')}</span>
                          </button>
                        </div>
                        <div className={styles.item}>
                          <button
                            title={t('deleteCommentTooltip')}
                            onMouseUp={() => onDeleteComment(comment)}
                          >
                            <i className="material-icons">delete</i>
                            <span>{t('deleteCommentTooltip')}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>
            <p className={styles.commentContent}>{comment.content}</p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default CommentItem;
