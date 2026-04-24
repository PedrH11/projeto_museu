import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';

const PECAS = [
  {
    title: "Bússola Antiga",
    year: "1890",
    img: "https://images.unsplash.com/photo-1524499982521-1ffd58dd89ea?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Máquina de Escrever",
    year: "1925",
    img: "https://images.unsplash.com/photo-1510131435222-383794b150c7?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Relógio de Bolso",
    year: "1910",
    img: "https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?auto=format&fit=crop&w=800&q=80",
  },
]

export function HighlightCarousel() {
  return (
    <section id="acervo" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl font-bold">Peças em Destaque</h2>
          <p className="text-muted-foreground mt-2">
            Uma amostra do acervo histórico
          </p>
        </div>

        <Carousel className="max-w-5xl mx-auto">
          <CarouselContent>
            {PECAS.map((peca, i) => (
              <CarouselItem key={i} className="md:basis-1/3">
                <Card className="overflow-hidden">
                  <CardContent className="p-0 relative aspect-square">
                    <Image
                      src={peca.img}
                      alt={peca.title}
                      fill
                      className="object-cover"
                    />

                    <div className="absolute bottom-0 w-full p-4 bg-black/40 text-white">
                      <p className="font-semibold">{peca.title}</p>
                      <p className="text-xs opacity-80">{peca.year}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
