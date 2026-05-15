import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const PECAS = [
  {
    title: 'Bússola Antiga',
    year: '1890',
    img: 'https://images.unsplash.com/photo-1524499982521-1ffd58dd89ea?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Máquina de Escrever',
    year: '1925',
    img: 'https://images.unsplash.com/photo-1510131435222-383794b150c7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Relógio de Bolso',
    year: '1910',
    img: 'https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?auto=format&fit=crop&w=1200&q=80',
  },
];

export function HighlightCarousel() {
  return (
    <section
      id="exposicoes"
      className="relative py-8 overflow-hidden w-full"
      style={{ backgroundColor: '#96460A' }}
    >
      {/* container MUITO maior */}
      <div className="w-full px-8 xl:px-8 2xl:px-8">
        <div className="flex items-end justify-between mb-14">
          <div>
            <h2 className="text-white text-2xl md:text-3xl font-bold drop-shadow-lg">
              Exposições
            </h2>
          </div>

          <Link
            href="/exposicoes"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-6 py-4 transition-all duration-200 hover:bg-white/10 rounded-full"
            style={{
              borderColor: 'rgba(255,240,200,0.50)',
              color: '#fff8ee',
            }}
          >
            Confira todas as exposições
            <ArrowRight size={14} />
          </Link>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-6">
            {PECAS.map((peca, i) => (
              <CarouselItem
                key={i}
                className="pl-6 basis-[70%] sm:basis-[50%] md:basis-[38%] lg:basis-[30%] xl:basis-[24%]"
              >
                <Card
                  className="overflow-hidden border-0 rounded-3xl group cursor-pointer shadow-2xl"
                  style={{ background: '#2a1005' }}
                >
                  <CardContent
                    className="p-0 relative"
                    style={{
                      aspectRatio: '3/4',
                    }}
                  >
                    <Image
                      src={peca.img}
                      alt={peca.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{
                        filter: 'sepia(0.18) brightness(0.88)',
                      }}
                    />

                    {/* overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(10,4,0,0.90) 0%, rgba(10,4,0,0.25) 55%, transparent 100%)',
                      }}
                    />

                    {/* info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div
                        className="mb-4 rounded-full"
                        style={{ width: 40, height: 3, background: '#e08030' }}
                      />

                      <p
                        className="font-serif text-2xl font-semibold leading-snug mb-2"
                        style={{ color: '#fff8ee' }}
                      >
                        {peca.title}
                      </p>

                      <p
                        className="text-sm tracking-[0.3em] font-light uppercase"
                        style={{ color: 'rgba(255,240,210,0.70)' }}
                      >
                        {peca.year}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious
            className="border transition-all duration-200 hover:bg-white/10 -left-2 h-14 w-14
            "
            style={{
              borderColor: 'rgba(255,240,200,0.40)',
              background: 'rgba(150,70,10,0.70)',
              color: '#fff8ee',
            }}
          />

          <CarouselNext
            className="
              border
              transition-all
              duration-200
              hover:bg-white/10
              -right-2
              h-14
              w-14
            "
            style={{
              borderColor: 'rgba(255,240,200,0.40)',
              background: 'rgba(150,70,10,0.70)',
              color: '#fff8ee',
            }}
          />
        </Carousel>
      </div>
    </section>
  );
}
