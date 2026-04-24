export async function getCroppedImg(
  imageSrc: string,
  crop: { x: number; y: number; width: number; height: number },
): Promise<File> {
  const image = new Image();
  image.src = imageSrc;

  await new Promise((resolve) => {
    image.onload = resolve;
  });

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const size = 512;

  canvas.width = size;
  canvas.height = size;

  ctx?.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, size, size);

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        resolve(
          new File([blob!], 'avatar.jpg', {
            type: 'image/jpeg',
          }),
        );
      },
      'image/jpeg',
      0.9,
    );
  });
}
