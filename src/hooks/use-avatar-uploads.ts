import { useState } from 'react';
import { uploadImage } from '../service/connection/ImagemService';

export function useAvatarUpload() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  async function upload(file: File, type: string) {
    setUploading(true);

    const response = await uploadImage(file, type, setProgress);

    setUploading(false);

    return response;
  }

  return {
    upload,
    progress,
    uploading,
  };
}
