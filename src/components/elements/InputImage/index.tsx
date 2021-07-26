import { useTranslation } from 'next-i18next';
import { ChangeEvent, FC, ReactNode, useState } from 'react';
import { FormGroup, FormInput } from 'shards-react';

interface Props {
  label: string;
  onChange: (url: ArrayBuffer | string) => void;
  errorMessage?: ReactNode;
}

const InputImage: FC<Props> = ({ label, errorMessage, onChange }) => {
  const [imgUrl, setImgUrl] = useState<any>();
  const { t } = useTranslation('common');

  const onValidate = (file: File) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert(t('thumbnailImageSizeTooBigError'));
      return false;
    }
    const acceptExtensions = ['png', 'jpg', 'jpeg'];
    const fileExt = file.name.split('.').reverse()[0];
    if (!acceptExtensions.includes(fileExt)) {
      alert(t('thumbnailWrongExtensionError'));
      return false;
    }
    return true;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      if (onValidate(file)) {
        const reader = new FileReader();
        reader.addEventListener('load', function (e) {
          const url = e.target?.result || '';
          setImgUrl(url);
          onChange(url);
        });
        reader.readAsDataURL(file);
      } else {
        e.target.value = '';
      }
    }
  };

  return (
    <FormGroup>
      <label>{label}</label>
      <FormInput onChange={handleChange} type="file" accept="image/*" />
      {errorMessage && <p className="error-text">{errorMessage}</p>}
      {imgUrl && (
        <div className="mt-2 img-wrapper">
          <img src={imgUrl} alt="upload image" className="img-fluid" />
        </div>
      )}
      <style jsx>{`
        .img-wrapper {
          max-width: 108px;
        }
      `}</style>
    </FormGroup>
  );
};

export default InputImage;
