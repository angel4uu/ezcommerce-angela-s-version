import { useState, useCallback } from "react";
import { arrayMove } from "@dnd-kit/sortable";

interface UploadedImage {
  id: string;
  url: string;
}

export const useImageUpload = (maxImages = 5) => {
  const [images, setImages] = useState<UploadedImage[]>([]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
    }));
    console.log("Imagen cargada",newImages)
    setImages((current) => {
      console.log("Imagen actual", current);
      const updated = [...current, ...newImages];
      console.log("Imagen subida", updated);
      return updated.slice(0, maxImages);
    });
    console.log("---------");
  }, [maxImages]);
  console.log("imagenes:",images)
  
  const removeImage = useCallback((id: string) => {
    setImages((prev) => prev.filter((image) => image.id !== id));
    console.log("Imagen eliminada");
  }, []); 

  const onDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setImages((currentImages) => {
        const oldIndex = currentImages.findIndex((img) => img.id === active.id);
        const newIndex = currentImages.findIndex((img) => img.id === over.id);
        return arrayMove(currentImages, oldIndex, newIndex);
      });
    }
  };

  return {
    images,
    handleFileUpload,
    removeImage,
    onDragEnd,
  };
};
