import { ChangeEvent, FC, ReactNode, useState } from 'react';
import { FormGroup, FormInput } from 'shards-react';
import { onValidateImg } from 'utils/helpers';

interface Props {
  label: string;
  fileUrl: string | Record<string, any>;
  onChange: (file: File) => void;
  errorMessage?: ReactNode;
}

const InputImage: FC<Props> = ({ label, errorMessage, onChange, fileUrl }) => {
  const [imgUrl, setImgUrl] = useState<any>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      if (onValidateImg(file)) {
        const reader = new FileReader();
        reader.addEventListener('load', function (e) {
          const url = e.target?.result || '';
          setImgUrl(url);
          onChange(file);
        });
        reader.readAsDataURL(file);
      } else {
        e.target.value = '';
      }
    }
  };

  const imageUrl = typeof fileUrl === 'object' ? imgUrl : fileUrl || imgUrl;

  return (
    <FormGroup>
      <label>{label}</label>
      <FormInput onChange={handleChange} type="file" accept="image/*" />
      {errorMessage && <p className="error-text">{errorMessage}</p>}
      {imageUrl && (
        <div className="mt-2 img-wrapper">
          <img src={imageUrl} alt="upload image" className="img-fluid" />
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
