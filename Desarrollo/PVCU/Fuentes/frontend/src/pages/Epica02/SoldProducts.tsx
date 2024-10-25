import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export function SoldProducts() {
  return (
    <div className="flex flex-col w-full gap-6 self-stretch my-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold text-terciaryLight">
          Productos vendidos
        </h3>
        <Link
          to="/purchasing-management"
          className="bg-[rgba(183,183,183,0.30)] p-2 rounded-full"
        >
          <ArrowUpRight className="text-2xl text-terciaryLight" />
        </Link>
      </div>
      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {Array.from({ length: 12 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="pl-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
            >
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-2xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
