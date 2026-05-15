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
    description:
      'Uma rara bússola marítima utilizada por navegadores europeus durante o final do século XIX em grandes expedições oceânicas.',
    startDate: '24/03/2026',
    endDate: '24/06/2026',
    featured: true,
    img: 'https://images.unsplash.com/photo-1524499982521-1ffd58dd89ea?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Máquina de Escrever',
    description:
      'Equipamento histórico utilizado em escritórios e redações no início do século XX, representando a evolução da comunicação escrita.',
    startDate: '10/04/2026',
    endDate: '18/08/2026',
    featured: false,
    img: 'https://images.unsplash.com/photo-1510131435222-383794b150c7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Relógio de Bolso',
    description:
      'Peça sofisticada produzida artesanalmente com acabamento em ouro e mecanismos internos de alta precisão para a época.',
    startDate: '02/05/2026',
    endDate: '30/09/2026',
    featured: false,
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
                <div className="relative pt-8">
                  {peca.featured && (
                    <div
                      className="absolute top-0 left-0 w-full h-20 rounded-t-3xl flex items-start justify-center pt-3"
                      style={{ background: 'rgba(0,0,0,0.60)' }}
                    >
                      <span className="text-white text-2xl font-medium tracking-wide">
                        Destaque
                      </span>
                    </div>
                  )}

                  <Card className="overflow-hidden border-0 rounded-3xl group cursor-pointer shadow-2xl bg-white h-full">
                    <CardContent className="p-0 h-full flex flex-col">
                      {/* IMAGEM */}
                      <div className="relative w-full h-[320px] overflow-hidden">
                        <Image
                          src={peca.img}
                          alt={peca.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          style={{
                            filter: 'sepia(0.18) brightness(0.88)',
                            objectPosition: '50% 20%',
                          }}
                        />
                      </div>

                      {/* INFOS */}
                      <div className="flex flex-col justify-between flex-1 p-4 text-left bg-white">
                        <div>
                          <p className="text-[10px] tracking-[0.25em] uppercase font-semibold text-zinc-500">
                            EXPOSIÇÃO | MUSEU HISTÓRICO
                          </p>

                          <div className="w-10 h-[2px] bg-[#96460A] my-4 rounded-full" />

                          <h3 className="text-lg font-bold text-zinc-900 mb-3 leading-snug">
                            {peca.title}
                          </h3>

                          <p className="text-sm text-zinc-600 leading-relaxed line-clamp-3 min-h-[54px]">
                            {peca.description}
                          </p>
                        </div>

                        <div className="mt-5 flex flex-col gap-1">
                          <p className="text-xs text-zinc-700">
                            <span className="font-semibold">Início</span> |{' '}
                            {peca.startDate}
                          </p>

                          <p className="text-xs text-zinc-700">
                            <span className="font-semibold">Término</span> |{' '}
                            {peca.endDate}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
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
