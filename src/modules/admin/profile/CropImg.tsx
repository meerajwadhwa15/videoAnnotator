import { useCallback, useState } from 'react';
import { Slider, Button } from 'shards-react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImages';
import { uploadImage } from 'utils/helpers';
import { useTranslation } from 'next-i18next';

export const CropImg = ({
  url,
  onCancel,
  onUpload,
}: {
  url: any;
  onCancel: () => void;
  onUpload: (p: string) => void;
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [cropAreaPixel, setCropAreaPixel] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCropAreaPixel(croppedAreaPixels);
  }, []);

  const handleSlide = (e) => {
    setZoom(parseFloat(e[0]));
  };

  const onSave = async () => {
    setLoading(true);
    const croppedImage: any = await getCroppedImg(url, cropAreaPixel, 0);
    const blob = await fetch(croppedImage).then((r) => r.blob());
    const file = new File([blob], 'avatar');
    const uploadedUrl = await uploadImage(file);
    setLoading(false);
    onUpload(uploadedUrl);
  };

  if (!url) return null;

  return (
    <>
      <div className="crop-container">
        <Cropper
          image={url}
          crop={crop}
          zoom={zoom}
          cropShape="round"
          aspect={1 / 1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div>
        <Slider
          className="slider my-3"
          onSlide={handleSlide}
          connect={[true, false]}
          start={[zoom]}
          range={{ min: 1, max: 3 }}
        />
      </div>
      <div className="d-flex justify-content-end">
        <Button onClick={onCancel} theme="white" className="border mr-3">
          {t('common:cancelButton')}
        </Button>
        <Button disabled={loading} onClick={onSave}>
          {loading ? t('common:savingButton') : t('common:saveButton')}
        </Button>
      </div>
      <style>
        {`
          .crop-container {
            position: relative;
            height: 180px;
            padding: 12px;
            overflow: hidden;
            border-radius: 10px;
            background: white;
          }
        `}
      </style>
    </>
  );
};
