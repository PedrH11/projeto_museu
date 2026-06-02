import { Input } from '@/components/ui/input';
import { Archive, Calendar, Image, Newspaper, Search } from 'lucide-react';

export function SearchSection() {
  return (
    <section id="pesquisa" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="font-serif text-3xl font-bold">Pesquise no Acervo</h2>

          <p className="text-muted-foreground">
            Explore documentos, fotos e registros históricos
          </p>

          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
            <Input
              className="pl-10 h-12 rounded-full"
              placeholder="Buscar..."
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {[
            { icon: Image, label: 'Fotos' },
            { icon: Newspaper, label: 'Jornais' },
            { icon: Archive, label: 'Peças' },
            { icon: Calendar, label: 'Eventos' },
          ].map((item, i) => (
            <button
              key={i}
              className="p-6 border rounded-xl flex flex-col items-center hover:bg-muted transition"
            >
              <item.icon className="w-8 h-8 mb-3 text-primary" />
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
