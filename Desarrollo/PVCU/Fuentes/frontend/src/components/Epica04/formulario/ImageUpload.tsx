import * as React from "react";
import { Plus, X } from "lucide-react";
import { useImageUpload } from "../../../pages/Epica04/hooks/useImageUpload";
import { ImagePreviewModal } from "./ImagePreviewModal";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const DraggableImage: React.FC<{
  id: string;
  url: string;
  onRemove: () => void;
  onClick: () => void;
}> = React.memo(({ id, url, onRemove, onClick }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative w-32 h-32 bg-muted rounded-lg overflow-hidden"
    >
      <img
        src={url}
        alt="Uploaded image"
        className="object-cover w-full h-full cursor-pointer"
        onClick={onClick}
      />
      <button
        onClick={onRemove}
        className="absolute top-1 right-1 p-1 bg-black bg-opacity-50 text-white rounded-full opacity-0 hover:opacity-100 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
});

export const ImageUpload: React.FC = () => {
  const {
    images,
    selectedImage,
    isModalOpen,
    handleFileUpload,
    removeImage,
    openModal,
    closeModal,
    onDragEnd,
  } = useImageUpload(10);

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold mb-2">Imágenes de tus productos</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Fotos - {images.length}/10 - Puedes agregar un máximo de 10 fotos
      </p>

      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={images.map((img) => img.id)} strategy={horizontalListSortingStrategy}>
          <div className="flex gap-4 items-start">
            {images.map((image) => (
              <DraggableImage
                key={image.id}
                id={image.id}
                url={image.url}
                onRemove={() => removeImage(image.id)}
                onClick={() => openModal(image.url)}
              />
            ))}
            {images.length < 10 && (
              <label className="w-32 h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                <Plus className="w-6 h-6 mb-1" />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            )}
          </div>
        </SortableContext>
      </DndContext>

      {/* Modal de vista previa de imagen */}
      {isModalOpen && <ImagePreviewModal imageUrl={selectedImage} onClose={closeModal} />}
    </div>
  );
};
