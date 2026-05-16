'use client';

import Image from 'next/image';

const OBRAS = [
  {
    title: 'Bússola Antiga',
    description:
      'Uma rara bússola marítima utilizada por navegadores europeus durante o final do século XIX em grandes expedições oceânicas.',
    img: 'https://images.unsplash.com/photo-1524499982521-1ffd58dd89ea?auto=format&fit=crop&w=1200&q=80',
    format: 'rectangular',
  },
  {
    title: 'Máquina de Escrever',
    description:
      'Equipamento histórico utilizado em escritórios e redações no início do século XX.',
    img: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1200&q=80',
    format: 'square',
  },
  {
    title: 'Relógio de Bolso',
    description:
      'Peça sofisticada produzida artesanalmente com acabamento em ouro e mecanismos internos de alta precisão.',
    img: 'https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?auto=format&fit=crop&w=1200&q=80',
    format: 'square',
  },
  {
    title: 'Lanterna Vintage',
    description:
      'Lanterna de latão utilizada em expedições noturnas durante o século XIX.',
    img: '/images/imagem_teste_card.jpg',
    format: 'rectangular',
  },
  {
    title: 'Óculos Antigos',
    description:
      'Óculos de armação dourada da época vitoriana, exemplo de artesanato óptico.',
    img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=80',
    format: 'square',
  },
];

export function RotatingArtworks() {
  return (
    <section
      className="w-full py-8 px-2 md:px-4 lg:px-6 bg-black/80"
      style={{ background: 'var(--foreground)' }}
    >
      <div className="grid grid-cols-2 auto-rows-max">
        {OBRAS.map((obra, index) => {
          const colSpan =
            obra.format === 'rectangular' ? 'col-span-2' : 'col-span-1';

          return (
            <div
              key={index}
              className={`${colSpan} h-[380px] relative overflow-hidden group cursor-pointer`}
            >
              {/* Background Image */}
              <Image
                src={obra.img}
                alt={obra.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Content - Bottom Left */}
              <div className="absolute bottom-0 left-0 p-3 md:p-5 w-full text-left">
                <h3
                  className="text-lg md:text-xl font-bold mb-0.5 leading-tight"
                  style={{ color: 'var(--accent)' }}
                >
                  {obra.title}
                </h3>
                <p className="text-sm md:text-sm text-white line-clamp-2">
                  {obra.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
