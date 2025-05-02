import { Card, CardContent } from "../../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/carousel";

// Komponen Carousel untuk menampilkan bukti masalah dalam bentuk gambar carousel
const ReportImagesCarousel = ({ buktiMasalah }: { buktiMasalah: string }) => {
  // Pisahkan URL gambar berdasarkan delimiter " | "
  const imageUrls = buktiMasalah.split(" | ");

  return (
    <Carousel className="w-full max-w-3xs">
      <CarouselContent>
        {imageUrls.map((url, index) => (
          <CarouselItem key={index}>
            <div className="p-0">
              <Card className="gap-0 p-0 border-0">
                <CardContent className="flex aspect-square items-center justify-center p-1 ">
                  <img
                    src={url}
                    alt={`Bukti Masalah ${index + 1}`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ReportImagesCarousel;
