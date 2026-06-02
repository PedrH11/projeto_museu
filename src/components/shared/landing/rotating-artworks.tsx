'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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
    title: 'Troféu Locomotiva de Prata',
    description:
      'Prêmio comemorativo institucional em formato de locomotiva sobre base metálica',
    img: 'https://images.unsplash.com/photo-1654426875983-a441ea09ad80?q=80&w=813&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
    img: '/images/sistine-chapel.jpg',
    format: 'rectangular',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    title: 'Cálice de Madeira Indígena',
    description:
      'Cálice artesanal esculpido em madeira nobre com acabamento polido, de origem indígena.',
    img: '/images/cup.jpg',
    format: 'square',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    title: 'Telefone de Parede Antigo',
    description:
      'Telefone de parede vintage em madeira e metal com sistema de manivela magnética do início do século XX.',
    img: '/images/old_telephone.jpg',
    format: 'square',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440006',
    title: 'Mona Lisa',
    description:
      'Lente de aumento ornamentada com cabo em madeira nobre, usada por cientistas e antiquários.',
    img: '/images/mona_lisa.jpg',
    format: 'square',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440007',
    title: 'Louvre',
    description:
      'Tinteiro de porcelana chinesa com motivos florais, utilizado na caligrafia tradicional.',
    img: '/images/louvre-museum.jpg',
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
];

export function RotatingArtworks() {
  const [screenSize, setScreenSize] = useState<ScreenSize>('large');

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

    // Large screen
    return format === 'rectangular' ? 'col-span-2' : 'col-span-1';
  };

  return (
    <section
      className="w-full py-8 px-2 md:px-4 lg:px-6 bg-black/80"
      style={{ background: 'var(--foreground)' }}
    >
      <div className={`grid ${getGridClass()} auto-rows-max gap-4`}>
        {OBRAS.map((obra) => {
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
                  style={{ color: 'rgb(241, 228, 178)' }}
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
    </section>
  );
}
