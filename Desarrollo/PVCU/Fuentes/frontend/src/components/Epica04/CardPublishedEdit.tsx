import { Star } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { ModalDeleteProduct } from "../../components/Epica04/ModalDeleteProduct";

export const CardPublishedEdit = () => {
  return (
    <Card className="w-52 p-3 overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden rounded-md mb-4">
          <img
            src="image-card.jpg"
            alt="Sony Headphones"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="py-3 px-2">
            <div className="flex items-center justify-center text-white bg-[#FBC116] rounded-3xl w-[68px] py-1 px-4 mb-3">
                <Star className="w-3 h-3 fill-white" />
                <span className="text-xs font-sans ml-1">4.8</span>
            </div>
            <h3 className="font-sans font-bold text-secondaryLight text-sm mb-1">Audifonos Sony</h3>
            <p className="text-sm font-bold text-terciaryLight">S/ 34.00</p>
        </div>
      </CardContent>
      <CardFooter className="grid gap-3 p-0">
        <Button variant="edit" className="w-full rounded-full">Editar</Button>
        <ModalDeleteProduct />
      </CardFooter>
    </Card>
  )
}
