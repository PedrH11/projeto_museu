import { HighlightCarousel } from '../components/shared/landing/carrossel';
import { Events } from '../components/shared/landing/evento';
import { Faqs } from '../components/shared/landing/faq';
import { Footer } from '../components/shared/landing/footer';
import { HeroMuseum } from '../components/shared/landing/hero';
import { Navbar } from '../components/shared/landing/nav-bar';
import { SearchSection } from '../components/shared/landing/pesquisa';

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col items-center w-full overflow-x-hidden">
        <HeroMuseum />
        <HighlightCarousel />
        <SearchSection />
        <Events />
        <Faqs />
      </main>
      <Footer />
    </div>
  );
}
