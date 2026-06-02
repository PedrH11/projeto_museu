import { http } from '../../lib/http';

export interface UploadPhotoResponse {
  originalName: string;
  absolutePath: string;
  absoluteThumbPath: string;
  type: string;
  mimeType: string;
}

export async function uploadImage(
  file: File,
  type: string,
  onProgress?: (progress: number) => void,
): Promise<UploadPhotoResponse> {
  const formData = new FormData();
  if (Array.isArray(file)) {
    file.forEach((f) => formData.append('image', f));
  } else {
    formData.append('image', file);
  }
  const { data } = await http.post('fotos', formData, {
    params: { type },
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress(e) {
      if (!e.total) return;

      const percent = Math.round((e.loaded * 100) / e.total);

      onProgress?.(percent);
    },
  });
  return data;
}
