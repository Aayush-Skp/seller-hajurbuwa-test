import Image from 'next/image';
import imageUploadIcon from '../../../public/icons/Camera_fill.png';

export default function ImageInputFieldWithPreview(props: any) {
  const { name, id, image, onChange } = props;

  const isImageValidFile = image && typeof image === 'object';
  const isImageValidLink = typeof image === 'string' && image.length !== 0;

  return (
    <label
      htmlFor={name}
      className={`group flex items-center justify-center w-[150px] h-[136px] bg-white shadow-xl ${
        !isImageValidFile ? 'cursor-pointer' : ''
      } `}
    >
      <Image
        layout={
          typeof image === 'object' ||
          (typeof image === 'string' && image.length !== 0)
            ? 'fill'
            : undefined
        }
        objectFit={
          typeof image === 'object' ||
          (typeof image === 'string' && image.length !== 0)
            ? 'contain'
            : undefined
        }
        src={
          isImageValidFile
            ? URL.createObjectURL(image as File)
            : isImageValidLink
            ? image
            : imageUploadIcon
        }
        alt="image"
        className="group-hover:scale-110 transition-transform duration-300"
      />
      <input
        id={id}
        type="file"
        name={name}
        className="hidden"
        onChange={(e) => {
          e.target?.files?.length !== 0 && onChange(e);
        }}
      />
    </label>
  );
}
