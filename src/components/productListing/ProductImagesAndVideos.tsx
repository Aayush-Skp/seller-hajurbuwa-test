import { useState } from 'react';
import Image from 'next/image';
import Info from '../../../public/icons/info.svg';
import AddIcon from '../../../public/icons/addIcon.svg';
import Button from '../common/Button';
import DiscardModal from './DiscardModal';
import cancel from '../../../public/icons/cross.svg';
import ImageInputFieldWithPreview from '../common/ImageUploadWithPreview';
import { convertImageToWebp } from '../../utils/imageConvertToWebp';


export default function ProductImagesAndVideos(props: any) {
 const { productDetails, decStep, incStep, setProductDetails } = props;


 const [isCoverImageValid, setIsCoverImageValid] = useState(true);
 const [isAtleast1ImageIsUploaded, setIsAtleast1ImageIsUploaded] = useState(true);


 async function resizeImage(file: File, targetSizeKB: number) {
   return new Promise<File>((resolve, reject) => {
     const img = document.createElement('img');
     const reader = new FileReader();


     reader.onload = (e) => {
       img.src = e.target?.result as string;
     };


     img.onload = async () => {
       const canvas = document.createElement('canvas');
       const ctx = canvas.getContext('2d');
       let width = img.width;
       let height = img.height;


       // Downscale image dimensions if needed
       if (img.width > 800 || img.height > 800) {
         const aspectRatio = img.width / img.height;
         if (aspectRatio > 1) {
           width = 800;
           height = 800 / aspectRatio;
         } else {
           height = 800;
           width = 800 * aspectRatio;
         }
       }


       canvas.width = width;
       canvas.height = height;


       ctx?.drawImage(img, 0, 0, width, height);


       const compressImage = async (quality: number) => {
         return new Promise<Blob | null>((resolve) => {
           canvas.toBlob(
             (blob) => {
               resolve(blob);
             },
             'image/jpeg',
             quality
           );
         });
       };


       let quality = 0.8; // Start with a balanced quality
       let blob = await compressImage(quality);


       while (blob && blob.size > targetSizeKB * 1024 && quality > 0.1) {
         quality -= 0.1;
         blob = await compressImage(quality);
       }


       if (blob && blob.size <= targetSizeKB * 1024) {
         resolve(new File([blob], file.name, { type: 'image/jpeg' }));
       } else {
         reject(new Error('Unable to compress image to the target size.'));
       }
     };


     reader.readAsDataURL(file);
   });
 }


 async function resizeAndConvertImage(file: File, targetSizeKB: number) {
   const resizedFile = await resizeImage(file, targetSizeKB);
   const webpFile = await convertImageToWebp(resizedFile, 0.8);
   return webpFile;
 }


 async function handleMultipleChange(e: React.ChangeEvent<HTMLInputElement>) {
   const files = e.target.files;


   if (!files) return;


   setIsCoverImageValid(true);
   setIsAtleast1ImageIsUploaded(true);


   const resizedAndConvertedFiles = await Promise.all(
     Array.from(files).map(async (file) => resizeAndConvertImage(file, 80))
   );


   setProductDetails((prev: any) => ({
     ...prev,
     images: {
       first: resizedAndConvertedFiles[0] ?? '',
       second: resizedAndConvertedFiles[1] ?? '',
       third: resizedAndConvertedFiles[2] ?? '',
       fourth: resizedAndConvertedFiles[3] ?? '',
       fifth: resizedAndConvertedFiles[4] ?? '',
       sixth: resizedAndConvertedFiles[5] ?? '',
       seventh: resizedAndConvertedFiles[6] ?? '',
       eighth: resizedAndConvertedFiles[7] ?? '',
     },
   }));
 }


 async function handleImageSelection(e: React.ChangeEvent<HTMLInputElement>) {
   const file = e.target.files?.[0];


   if (!file) return;


   setIsCoverImageValid(true);
   setIsAtleast1ImageIsUploaded(true);


   const resizedAndConvertedFile = await resizeAndConvertImage(file, 80);


   setProductDetails((prev: any) => ({
     ...prev,
     images: {
       ...prev.images,
       [e.target.name]: resizedAndConvertedFile,
     },
   }));
 }


 function handleDeleteAndMakeCover(action: 'cover' | 'delete', name: string) {
   setIsCoverImageValid(true);
   setIsAtleast1ImageIsUploaded(true);


   setProductDetails((prev: any) => ({
     ...prev,
     cover_image: action === 'cover' ? prev.images[name] : prev.cover_image,
     images: {
       ...prev.images,
       [name]: '',
     },
   }));
 }


 const atleast1ImageIsUploaded = () => {
   let count = 0;


   productDetails?.images?.first && count++;
   productDetails?.images?.second && count++;
   productDetails?.images?.third && count++;
   productDetails?.images?.fourth && count++;
   productDetails?.images?.fifth && count++;
   productDetails?.images?.sixth && count++;
   productDetails?.images?.seventh && count++;
   productDetails?.images?.eighth && count++;
   return count > 0;
 };


 function handleSubmit() {
   if (productDetails.cover_image === '') {
     setIsCoverImageValid(false);
   }


   if (!atleast1ImageIsUploaded()) {
     setIsAtleast1ImageIsUploaded(false);
   }


   if (productDetails.cover_image === '' || !atleast1ImageIsUploaded()) {
     return;
   }


   incStep();
 }


 return (
   <form className="px-8 py-10 space-y-5">
     <div className="flex items-center space-x-3">
       <Image src={Info} alt="" />
       <p>Fields with asterisks* should be filled.</p>
     </div>


     <div className="w-full space-y-10">
       <div className="w-full flex items-center space-x-3">
         <p>Product Images*</p>
         <div>
           <label htmlFor="productPhotosInput" className="w-24 h-16 cursor-pointer">
             <input
               type="file"
               id="productPhotosInput"
               multiple
               className="hidden"
               onChange={(e) => handleMultipleChange(e)}
             />
             <div className="flex items-center space-x-3">
               <p className="text-blue-700 text-sm">Upload multiple files here</p>
               <div className="flex items-center">
                 <Image src={AddIcon} alt="" />
               </div>
             </div>
           </label>
         </div>
       </div>


       <div className="flex items-center space-x-5">
         <div className="flex flex-col items-center">
           <div
             className={`flex flex-col items-center justify-center w-80 h-80 border rounded ${
               isCoverImageValid ? 'border-gray-600' : 'border-error-primary'
             }`}
           >
             {productDetails.cover_image ? (
               <Image
                 width={500}
                 height={500}
                 src={
                   typeof productDetails.cover_image === 'string' &&
                   productDetails.cover_image !== ''
                     ? productDetails.cover_image
                     : URL.createObjectURL(productDetails.cover_image)
                 }
                 alt=""
               />
             ) : (
               <span className={!isCoverImageValid ? 'text-error-primary' : ''}>
                 Please select a cover image
               </span>
             )}
           </div>
           <span className="text-success-primary font-semibold">Cover Image</span>
         </div>


         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5">
           {Object.entries(productDetails.images)?.map((image) => (
             <div key={image[0]} className="relative flex items-center justify-center">
               <div className="group relative">
                 <ImageInputFieldWithPreview
                   id={image[0]}
                   name={image[0]}
                   image={image[1]}
                   onChange={handleImageSelection}
                 />


                 {typeof image[1] === 'object' ||
                 (typeof image[1] === 'string' && image[1].length !== 0) ? (
                   <div className="absolute inset-0 flex flex-col items-center justify-center text-sm space-y-2 text-white w-full h-full opacity-0 group-hover:opacity-100 group-hover:bg-opacity-30 group-hover:bg-white transition-all duration-300">
                     <label
                       htmlFor={image[0]}
                       className="flex items-center justify-center bg-accent-primary w-2/3 h-8 rounded cursor-pointer"
                     >
                       Change
                     </label>
                     <button
                       onClick={() => handleDeleteAndMakeCover('cover', image[0])}
                       className="flex items-center justify-center w-2/3 h-8 border border-accent-primary bg-white text-accent-primary rounded"
                     >
                       Set as cover
                     </button>
                   </div>
                 ) : null}
               </div>


               {typeof image[1] === 'object' ||
               (typeof image[1] === 'string' && image[1].length !== 0) ? (
                 <button
                   onClick={() => handleDeleteAndMakeCover('delete', image[0])}
                   className="absolute -top-2 -right-2 scale-75 hover:scale-95 transition-transform duration-300 border flex items-center justify-center w-[30px] h-[30px] bg-white rounded-full"
                 >
                   <Image src={cancel} alt="" />
                 </button>
               ) : null}
             </div>
           ))}
           {!isAtleast1ImageIsUploaded && (
             <span className="text-error-primary">Please upload at least 1 image</span>
           )}
         </div>
       </div>
     </div>
     <div className="flex justify-end space-x-3">
       <div className="w-96 flex items center justify-center space-x-4">
         <DiscardModal />
         <Button className="py-3 text-sm" onClick={decStep}>
           Back
         </Button>
         <button
           type="button"
           className="w-full text-white px-14 py-2 bg-blue-700 rounded hover:opacity-80 transition-opacity"
           onClick={handleSubmit}
         >
           Continue
         </button>
       </div>
     </div>
   </form>
 );
}