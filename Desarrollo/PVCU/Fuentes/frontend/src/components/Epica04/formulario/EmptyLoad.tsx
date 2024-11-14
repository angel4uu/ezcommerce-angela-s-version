import { Plus } from "lucide-react";

export const EmptyLoad: React.FC<{
    handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }> = ({handleFileUpload}) => {
  return (
    <label className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-2">
        <Plus className="w-6 h-6" />
      </div>
      <span className="text-sm font-medium">Agrega fotos</span>
      <input
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />
    </label>
  );
};
