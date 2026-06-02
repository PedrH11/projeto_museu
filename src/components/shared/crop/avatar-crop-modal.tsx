'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../../../lib/get-cropped-image';

export function AvatarCropModal({ image, open, onClose, onConfirm }: any) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  async function handleConfirm() {
    const croppedFile = await getCroppedImg(image, croppedAreaPixels);

    onConfirm(croppedFile);
  }
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-full">
        <DialogHeader>
          <DialogTitle>Ajustar foto</DialogTitle>
        </DialogHeader>

        <div className="relative w-full max-w-[520px] aspect-square bg-black rounded-lg overflow-hidden mx-auto">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            cropSize={{ width: 420, height: 420 }}
            showGrid={true}
            minZoom={1}
            maxZoom={3}
            zoomSpeed={0.2}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={(_, croppedAreaPixels) => {
              setCroppedAreaPixels(croppedAreaPixels);
            }}
          />
        </div>
        <div className="flex items-center gap-3 mt-4">
          <span className="text-sm text-muted-foreground whitespace-nowrap">Zoom</span>

          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>

          <Button onClick={handleConfirm}>Confirmar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
