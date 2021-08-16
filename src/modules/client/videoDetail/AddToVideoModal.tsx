import React from 'react';
// import { Button, Modal, ModalHeader, ModalBody } from 'shards-react';
// import { toast } from 'react-toastify';
// import { useTranslation } from 'next-i18next';
// import { useAppDispatch, useAppSelector } from 'redux/hooks';
// import {
//   messageSelector,
// } from './slice';

// interface props {
//   isOpen: boolean;
//   videoId: number;
//   toggleDeleteModal: () => void;
//   clearSearchKeyword: () => void;
// }

// const DeleteVideoModal: FC<props> = ({
//   isOpen,
//   videoId,
//   toggleDeleteModal,
//   clearSearchKeyword,
// }) => {
//   const message = useAppSelector(messageSelector);
//   // const loading = useAppSelector(deleteVideoLoadingSelector);

//   const dispatch = useAppDispatch();
//   const { t } = useTranslation(['home']);

//   useEffect(() => {
//     if (message.type === 'success' && message.text === 'delete_video_success') {
//       toast.success(t('deleteSuccessMsg'));
//       toggleDeleteModal();
//       clearSearchKeyword();
//     }

//     if (message.type === 'error' && message.text === 'delete_video_error') {
//       toast.error(t('deleteErrorMsg'));
//       toggleDeleteModal();
//       clearSearchKeyword();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [message]);

//   // function onDeleteVideo() {
//   //   dispatch(deleteVideo(videoId));
//   // }

//   return (
//     <React.Fragment>
//       <Modal
//         centered
//         size="md"
//         open={isOpen}
//         toggle={() => toggleDeleteModal()}
//       >
//         <ModalHeader>{t('deleteModalHeaderText')}</ModalHeader>
//         <ModalBody style={{ textAlign: 'right' }}>
//           <p style={{ textAlign: 'center' }}>{t('deleteConfirmText')}</p>
//           <Button
//             type="button"
//             // disabled={loading}
//             // onClick={() => {
//             //   onDeleteVideo();
//             // }}
//           >
//             {t('deleteSubmitBtn')}
//           </Button>
//           <Button
//             type="button"
//             theme="outline"
//             onClick={() => {
//               toggleDeleteModal();
//             }}
//           >
//             {t('deleteCancelBtn')}
//           </Button>
//         </ModalBody>
//       </Modal>
//     </React.Fragment>
//   );
// };

const AddToVideoModal = () => {
  return (
    <React.Fragment>
      <p>add to.</p>
    </React.Fragment>
  );
};

export default AddToVideoModal;
