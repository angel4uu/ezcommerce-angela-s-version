import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export const ModalDeleteProduct = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="delete">Eliminar</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            <span className="text-2xl text-terciaryLight">Eliminar producto</span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center pt-2">
            ¿Está seguro de que desea eliminar este producto de su lista de productos publicados? Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center gap-3">
          <AlertDialogCancel className="sm:w-24">Cancelar</AlertDialogCancel>
          <AlertDialogAction className="sm:w-24 bg-secondaryLight hover:bg-blue-900">Aceptar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
