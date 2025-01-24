export async function convertImageToWebp(file, quality = 0.8) {
    return new Promise((resolve, reject) => {
      const img = document.createElement('img');
      const reader = new FileReader();
       reader.onload = (e) => {
        img.src = e.target?.result;
      };
       img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
         canvas.width = img.width;
        canvas.height = img.height;
         ctx?.drawImage(img, 0, 0, img.width, img.height);
         canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(new File([blob], file.name.replace(/\.[^.]+$/, '.webp'), { type: 'image/webp' }));
            } else {
              reject(new Error('Failed to convert image to WebP format.'));
            }
          },
          'image/webp',
          quality
        );
      };
       reader.onerror = () => reject(new Error('Failed to read the file.'));
      reader.readAsDataURL(file);
    });
  }
  