'use client';

import imageCompression from 'browser-image-compression';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

import { Camera, HardDriveUpload, Trash, User } from 'lucide-react';

import { useAvatarUpload } from '../../../hooks/use-avatar-uploads';
import { useDictionary } from '../../../service/providers/i18n-providers';
import { AvatarCropModal } from './avatar-crop-modal';

interface UploadAvatarProps {
  onChange: (url: string | null) => void;
  defaultImage?: string;
  type: string;
}

export function UploadAvatar({ onChange, defaultImage, type }: UploadAvatarProps) {
  const [preview, setPreview] = React.useState<string | undefined>(defaultImage);
  const [cropImage, setCropImage] = React.useState<string>();
  const [cropOpen, setCropOpen] = React.useState(false);
  const dict = useDictionary();
  const { upload, progress, uploading } = useAvatarUpload();

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    setCropImage(url);
    setCropOpen(true);
  }

  async function handleCropConfirm() {
    if (!cropImage) return;

    const response = await fetch(cropImage);
    const blob = await response.blob();

    const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });

    const compressed = await imageCompression(file, {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 512,
    });

    const result = await upload(compressed, type);

    setPreview(cropImage);
    onChange(result.absolutePath);

    setCropOpen(false);
  }

  function removeImage() {
    setPreview(undefined);
    onChange(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Label>{dict.usuario.foto.label}</Label>

      {/* AVATAR */}
      <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
        <Avatar className="w-56 h-56 border-4 shadow-xl">
          <AvatarImage src={preview} className="object-cover" />
          <AvatarFallback>
            <User size={48} />
          </AvatarFallback>
        </Avatar>

        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
          <Camera className="text-white w-8 h-8" />
        </div>
      </div>

      {/* INPUT FILE */}
      <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleSelect} />

      {/* BOTÕES */}
      <div className="flex gap-2">
        <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
          <HardDriveUpload className="w-4 h-4 mr-1" />
          {dict.usuario.foto.actions.update}
        </Button>

        <Button type="button" className="bg-red-500 text-white" size="sm" onClick={removeImage}>
          <Trash className="w-4 h-4 mr-1" />
          {dict.usuario.foto.actions.remove}
        </Button>
      </div>

      {/* PROGRESS */}
      {uploading && (
        <div className="w-full max-w-[200px] space-y-1">
          <Progress value={progress} />
          <p className="text-xs text-muted-foreground text-center">
            {dict.usuario.foto.actions.send}
            {progress}%
          </p>
        </div>
      )}

      {/* MODAL CROP */}
      <AvatarCropModal
        open={cropOpen}
        image={cropImage}
        onClose={() => setCropOpen(false)}
        onConfirm={handleCropConfirm}
      />
    </div>
  );
}
