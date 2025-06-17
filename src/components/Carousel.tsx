import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface CarouselSlide {
  id: string | number;
  imageUrl: string;
  altText: string;
  content?: React.ReactNode; // Optional custom content overlay
}

interface CarouselProps {
  slides: CarouselSlide[];
  autoplayDelay?: number;
}

const Carousel: React.FC<CarouselProps> = ({ slides, autoplayDelay = 4000 }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: autoplayDelay, stopOnInteraction: false }),
  ]);

  console.log("Rendering Carousel with slides:", slides.length);

  if (!slides || slides.length === 0) {
    return <div className="text-center py-4">No slides to display.</div>;
  }

  return (
    <div className="embla overflow-hidden rounded-lg shadow-lg" ref={emblaRef}>
      <div className="embla__container flex">
        {slides.map((slide) => (
          <div className="embla__slide flex-[0_0_100%] min-w-0" key={slide.id}>
            <Card className="border-0 rounded-none"> {/* Remove card border if image fills it */}
              <CardContent className="p-0"> {/* Remove padding if image fills it */}
                <AspectRatio ratio={16 / 9}> {/* Adjust ratio as needed */}
                  <img
                    src={slide.imageUrl || '/placeholder.svg'}
                    alt={slide.altText}
                    className="object-cover w-full h-full"
                    onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
                  />
                </AspectRatio>
                {slide.content && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 p-4">
                    {slide.content}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      {/* Consider adding Prev/Next buttons and Dots for navigation if design requires */}
    </div>
  );
};
export default Carousel;