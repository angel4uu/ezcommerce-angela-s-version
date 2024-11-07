import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LucideProps } from "lucide-react";

interface ModalMessageProps {
  modalOpen: boolean;
  icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  description: string;
}

export const ModalMessage = ({
  modalOpen,
  icon: Icon,
  title,
  description,
}: ModalMessageProps) => {
  const [isOpen, setIsOpen] = useState(modalOpen);

  useEffect(() => {
    setIsOpen(modalOpen);
  }, [modalOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <div className="flex gap-2 items-center">
            {Icon && <Icon height={20} width={20} className="text-secondaryLight" />}
            <DialogTitle className="font-black self-end">{title}</DialogTitle>
          </div>
          <DialogDescription className="text-terciaryLight text-base">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex">
          <Button
            className="bg-secondaryLight hover:opacity-95 hover:bg-secondaryLight"
            onClick={() => setIsOpen(false)}
          >
            Aceptar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};