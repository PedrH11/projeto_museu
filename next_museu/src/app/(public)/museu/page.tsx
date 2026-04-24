import { HighlightCarousel } from '../../../components/shared/landing/carrossel';
import { Events } from '../../../components/shared/landing/evento';
import { Faqs } from '../../../components/shared/landing/faq';
import { HeroMuseum } from '../../../components/shared/landing/hero';
import { SearchSection } from '../../../components/shared/landing/pesquisa';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-col flex-grow w-full">
        <HeroMuseum />
        <HighlightCarousel />
        <SearchSection />
        <Events />
        <Faqs />
      </main>
    </div>
  );
}
