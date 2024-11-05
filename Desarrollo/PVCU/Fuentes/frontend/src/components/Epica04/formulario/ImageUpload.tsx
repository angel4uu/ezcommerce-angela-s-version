import * as React from "react"
import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type ImageUploadProps = {
  images: File[]
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveImage: (index: number) => void
  onImageClick: (imageUrl: string) => void
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ images, onImageUpload, onRemoveImage, onImageClick }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  return (
    <div className="space-y-2">
      <p className="text-base">Imágenes de tus productos</p>
      <p className="text-base text-muted-foreground">
        Fotos - {images.length}/10 - Puedes agregar un máximo de 10 fotos
      </p>
      <Card className="border-dashed">
        <div className="flex flex-col items-center justify-center gap-4">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={onImageUpload}
          />
          <Button
            variant="outline"
            className="w-full h-32"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center justify-center h-9 w-9 bg-[#555555] rounded-full">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <span>Agrega fotos</span>
            </div>
          </Button>

          {images.length > 0 && (
            <div className="grid grid-cols-5 gap-4 w-full p-2">
              {images.map((image, index) => (
                <div key={index} className="aspect-square relative group">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Product ${index + 1}`}
                    className="object-cover w-full h-full rounded-lg cursor-pointer hover:border-2 hover:border-terciaryLight"
                    onClick={() => onImageClick(URL.createObjectURL(image))}
                  />
                  <button
                    onClick={() => onRemoveImage(index)}
                    className="absolute top-1 right-1 p-1 bg-black bg-opacity-50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
