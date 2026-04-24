import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function HeroMuseum() {
  return (
    <section id="hero" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6 grid gap-12 lg:grid-cols-2 items-center">
        <div className="space-y-6">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold">
            Preservando a história,
            <br />
            inspirando o futuro.
          </h1>

          <p className="text-muted-foreground text-lg max-w-xl">
            O Museu Vivo preserva a memória regional através de peças,
            fotografias e documentos históricos.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Button size="lg">Explorar Acervo</Button>
            <Button size="lg" variant="outline">
              Agendar Visita
            </Button>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <Image
            src="https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=1200&q=80"
            alt="Interior de museu"
            width={1200}
            height={800}
            className="object-cover w-full h-[420px] md:h-[500px]"
          />
        </div>
      </div>
    </section>
  );
}
