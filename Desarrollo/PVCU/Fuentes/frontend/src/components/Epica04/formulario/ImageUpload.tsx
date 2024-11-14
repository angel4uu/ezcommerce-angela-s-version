import * as React from "react";
import { Plus, X, Maximize2 } from "lucide-react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface UploadedImage {
  id: string;
  url: string;
}

interface SortableImageProps {
  image: UploadedImage;
  onRemove: (id: string) => void;
  onPreview: (url: string) => void;
}

const SortableImage: React.FC<SortableImageProps> = ({ image, onRemove, onPreview }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: image.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group aspect-square bg-muted rounded-lg overflow-hidden"
      {...attributes}
      {...listeners}
    >
      <img
        src={image.url}
        alt="Uploaded product"
        className="w-full h-full object-cover cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onPreview(image.url); // Activa la previsualización al hacer clic
        }}
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPreview(image.url);
          }}
          className="p-1.5 bg-white/90 rounded-full hover:bg-white transition-colors"
        >
          <Maximize2 className="w-4 h-4 text-gray-900" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(image.id);
          }}
          className="p-1.5 bg-white/90 rounded-full hover:bg-white transition-colors"
        >
          <X className="w-4 h-4 text-gray-900" />
        </button>
      </div>
    </div>
  );
};

interface ImageUploadProps {
  images: UploadedImage[];
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (id: string) => void;
  onDragEnd: (event: any) => void;
  onPreview: (url: string) => void; // Nueva prop para previsualizar
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  images,
  handleFileUpload,
  removeImage,
  onDragEnd,
  onPreview,
}) => {
  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Imágenes de tus productos</h2>
          <p className="text-sm text-muted-foreground">
            Fotos - {images.length}/5 - Puedes agregar un máximo de 5 fotos
          </p>
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={images.map((img) => img.id)} strategy={horizontalListSortingStrategy}>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {images.map((image) => (
                <SortableImage
                  key={image.id}
                  image={image}
                  onRemove={removeImage}
                  onPreview={onPreview}
                />
              ))}
              {images.length < 5 && (
                <label className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/40 transition-colors cursor-pointer flex items-center justify-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <Plus className="w-6 h-6 text-muted-foreground" />
                </label>
              )}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};
