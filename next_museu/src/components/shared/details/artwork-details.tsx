import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

interface ObraDetalhes {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  img: string;
  categories: string[];
  year?: string;
  artist?: string;
  material?: string;
}

const OBRAS_DATABASE: Record<string, ObraDetalhes> = {
  '550e8400-e29b-41d4-a716-446655440000': {
    id: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Monte Fuji',
    description:
      'Uma rara bússola marítima utilizada por navegadores europeus durante o final do século XIX.',
    fullDescription:
      'Esta bússola marítima é um exemplar raro e bem preservado que foi utilizada por navegadores europeus durante o final do século XIX. Construída com precisão de relojoaria, apresenta mecanismos internos complexos e acabamentos em latão. É um testemunho importante da história da navegação marítima e da tecnologia científica da época.',
    img: '/images/mount_fuji.jpg',
    categories: ['Navegação', 'Século XIX', 'Instrumentos Científicos'],
    year: '1880-1890',
    artist: 'Fabricante Europeu',
    material: 'Latão e vidro',
  },
  '550e8400-e29b-41d4-a716-446655440001': {
    id: '550e8400-e29b-41d4-a716-446655440001',
    title: 'Locomotiva',
    description:
      'Peça sofisticada produzida artesanalmente com acabamento em ouro e mecanismos internos de alta precisão.',
    fullDescription:
      'Uma miniatura sofisticada de locomotiva produzida artesanalmente no final do século XIX. Apresenta acabamento em ouro 24 quilates e mecanismos internos de alta precisão que funcionam perfeitamente. Os detalhes são impressionantes, com cada componente cuidadosamente trabalhado. Este é um exemplo excepcional da artesanato e engenharia da época.',
    img: '/images/locomotiva.png',
    categories: ['Transporte', 'Miniatura', 'Engenharia'],
    year: '1885',
    artist: 'Mestre Artesão Desconhecido',
    material: 'Ouro, aço e vidro',
  },
  '550e8400-e29b-41d4-a716-446655440004': {
    id: '550e8400-e29b-41d4-a716-446655440004',
    title: 'Óculos Antigos',
    description:
      'Óculos de armação dourada da época vitoriana, exemplo de artesanato óptico refinado.',
    fullDescription:
      'Um par de óculos vitoriano com armação de ouro 18 quilates em excelente estado de conservação. As lentes originais de vidro óptico foram cuidadosamente preservadas. Representa a elegância e sofisticação dos acessórios de moda durante o período vitoriano, quando os óculos não eram apenas funcionais, mas também símbolos de status e refinamento.',
    img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=80',
    categories: ['Moda', 'Período Vitoriano', 'Acessórios'],
    year: '1870-1880',
    artist: 'Ótico Vitoriano',
    material: 'Ouro 18K e vidro óptico',
  },
  '550e8400-e29b-41d4-a716-446655440005': {
    id: '550e8400-e29b-41d4-a716-446655440005',
    title: 'Mapa Antigo',
    description:
      'Mapa do século XVII mostrando as rotas comerciais entre Europa e Ásia durante a Era dos Descobrimentos.',
    fullDescription:
      'Um mapa cartográfico do século XVII que documenta as rotas comerciais principais entre Europa e Ásia durante a Era dos Descobrimentos. Elaborado manualmente com tinta e pigmentos naturais, apresenta anotações em latim e detalhes geográficos notáveis para a época. Este mapa é uma valiosa peça histórica que ilustra o conhecimento geográfico e as ambições comerciais do período.',
    img: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
    categories: ['Cartografia', 'Século XVII', 'História Marítima'],
    year: '1650-1680',
    artist: 'Cartógrafo Desconhecido',
    material: 'Papel e tinta',
  },
};

export function ArtworkDetails({ obraId }: { obraId: string }) {
  const obra = OBRAS_DATABASE[obraId];

  if (!obra) {
    return (
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Obra não encontrada</h1>
          <p className="text-muted-foreground mb-8">
            Desculpe, não conseguimos encontrar a obra que você está procurando.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow w-full py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Botão voltar e título */}
        <div className="mb-8">
          <Link
            href="/acervo"
            className="inline-flex items-center gap-2 text-sm font-medium mb-6 hover:opacity-70 transition-opacity"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Voltar ao Acervo
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold font-serif">
            Detalhes da Obra:
          </h1>
        </div>

        {/* Seção principal com imagem e informações */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Imagem da obra */}
          <div className="flex items-start">
            <div className="w-full h-[500px] relative rounded-lg overflow-hidden shadow-lg">
              <Image
                src={obra.img}
                alt={obra.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Informações da obra */}
          <div className="flex flex-col justify-start space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
                {obra.title}
              </h1>

              {/* Categorias */}
              <div className="flex flex-wrap gap-2 mb-6">
                {obra.categories.map((category) => (
                  <Badge
                    key={category}
                    variant="secondary"
                    className="text-xs md:text-sm"
                  >
                    {category}
                  </Badge>
                ))}
              </div>

              {/* Descrição curta */}
              <p className="text-lg text-muted-foreground mb-6">
                {obra.description}
              </p>
            </div>

            {/* Detalhes técnicos */}
            <div className="space-y-4 border-t pt-6">
              {obra.year && (
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      Período
                    </p>
                    <p className="text-lg font-medium">{obra.year}</p>
                  </div>
                </div>
              )}

              {obra.artist && (
                <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Artista / Fabricante
                  </p>
                  <p className="text-lg font-medium">{obra.artist}</p>
                </div>
              )}

              {obra.material && (
                <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Material
                  </p>
                  <p className="text-lg font-medium">{obra.material}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Descrição completa */}
        <div className="mb-16 border-t pt-12">
          <h2 className="text-3xl font-bold mb-6 font-serif">Sobre esta obra</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {obra.fullDescription}
          </p>
        </div>

        {/* Seção de visualização 3D - Placeholder */}
        <div className="border-t pt-12">
          <div className="rounded-lg border-2 border-dashed border-muted-foreground/30 p-16 text-center bg-muted/20">
            <div className="max-w-2xl mx-auto">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 mx-auto text-muted-foreground/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">
                Visualização 3D em Desenvolvimento
              </h3>
              <p className="text-muted-foreground mb-4">
                Estamos preparando uma experiência interativa em 3D para esta obra.
                Em breve, você poderá visualizar e explorar todos os detalhes desta
                peça sob diferentes ângulos e com zoom avançado.
              </p>
              <p className="text-sm text-muted-foreground italic">
                Esta seção será preenchida com tecnologia 3D de última geração.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}