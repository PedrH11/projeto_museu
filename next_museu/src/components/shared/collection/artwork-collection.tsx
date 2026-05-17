'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

type ScreenSize = 'small' | 'medium' | 'large';

type Format = 'rectangular' | 'square';

interface Obra {
  id: string;
  title: string;
  description: string;
  img: string;
  format: Format;
}

const OBRAS: Obra[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Bússola Antiga',
    description:
      'Uma rara bússola marítima utilizada por navegadores europeus durante o final do século XIX em grandes expedições oceânicas.',
    img: 'https://images.unsplash.com/photo-1524499982521-1ffd58dd89ea?auto=format&fit=crop&w=1200&q=80',
    format: 'rectangular',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    title: 'Máquina de Escrever',
    description:
      'Equipamento histórico utilizado em escritórios e redações no início do século XX.',
    img: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1200&q=80',
    format: 'square',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    title: 'Relógio de Bolso',
    description:
      'Peça sofisticada produzida artesanalmente com acabamento em ouro e mecanismos internos de alta precisão.',
    img: 'https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?auto=format&fit=crop&w=1200&q=80',
    format: 'square',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    title: 'Lanterna Vintage',
    description:
      'Lanterna de latão utilizada em expedições noturnas durante o século XIX.',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
    format: 'rectangular',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    title: 'Óculos Antigos',
    description:
      'Óculos de armação dourada da época vitoriana, exemplo de artesanato óptico.',
    img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=80',
    format: 'square',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    title: 'Mapa Antigo',
    description:
      'Mapa do século XVII mostrando as rotas comerciais entre Europa e Ásia durante a Era dos Descobrimentos.',
    img: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
    format: 'rectangular',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440006',
    title: 'Lente de Aumento',
    description:
      'Lente de aumento ornamentada com cabo em madeira nobre, usada por cientistas e antiquários.',
    img: 'https://images.unsplash.com/photo-1578021735025-c23f0a00b281?auto=format&fit=crop&w=1200&q=80',
    format: 'square',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440007',
    title: 'Tinteiro Chinês',
    description:
      'Tinteiro de porcelana chinesa com motivos florais, utilizado na caligrafia tradicional.',
    img: 'https://images.unsplash.com/photo-1578021735025-c23f0a00b281?auto=format&fit=crop&w=1200&q=80',
    format: 'rectangular',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440008',
    title: 'Câmera Fotográfica',
    description:
      'Câmera de vidro e metal dos anos 1920, marca de precursora da fotografia moderna.',
    img: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80',
    format: 'square',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440009',
    title: 'Globo Terrestre',
    description:
      'Globo terrestre em madeira e papel com representação das rotas navegáveis do século XVII.',
    img: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b3?auto=format&fit=crop&w=1200&q=80',
    format: 'rectangular',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440010',
    title: 'Compasso Antigo',
    description:
      'Compasso de bronze utilizado em navegação e cartografia durante o século XIX.',
    img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80',
    format: 'square',
  },
];

export function ArtworkCollection() {
  const [screenSize, setScreenSize] = useState<ScreenSize>('large');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScreenSize('small');
      } else if (window.innerWidth < 1024) {
        setScreenSize('medium');
      } else {
        setScreenSize('large');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getGridClass = () => {
    switch (screenSize) {
      case 'small':
        return 'grid-cols-1';
      case 'medium':
        return 'grid-cols-2';
      default:
        return 'grid-cols-3';
    }
  };

  const getColSpanClass = (format: Format) => {
    if (screenSize === 'small') {
      return 'col-span-1';
    }

    if (screenSize === 'medium') {
      return format === 'rectangular' ? 'col-span-2' : 'col-span-1';
    }

    return format === 'rectangular' ? 'col-span-2' : 'col-span-1';
  };

  const filteredObras = OBRAS.filter((obra) =>
    obra.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    obra.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="w-full">
      {/* Header */}
      <div className="w-full py-12 px-2 md:px-2 lg:px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-8">
            Acervo de Obras
          </h1>

          {/* Search Bar */}
          <div className="relative w-full">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar obras..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-black/20 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-black/40 transition-colors"
            />
          </div>

          {/* Results count */}
          <p className="text-gray-400 text-sm mt-4">
            {filteredObras.length} {filteredObras.length === 1 ? 'obra' : 'obras'} encontrada
            {filteredObras.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="w-full py-8 px-2 md:px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          {filteredObras.length > 0 ? (
            <div className={`grid ${getGridClass()} auto-rows-max gap-4`}>
              {filteredObras.map((obra) => {
                const colSpan = getColSpanClass(obra.format);

                return (
                  <Link
                    href={`/acervo/${obra.id}/detalhes`}
                    key={obra.id}
                    className={`${colSpan} h-[380px] relative overflow-hidden group cursor-pointer block`}
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
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">Nenhuma obra encontrada para sua busca.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
