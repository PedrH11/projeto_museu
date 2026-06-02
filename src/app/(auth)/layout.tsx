import { LanguageDropdown } from '../../components/layout/language-dropdown';
import { ThemeSwitch } from '../../components/layout/theme-switch';
import { getClientDictionary } from '../../lib/get-dictionary';
import { Providers } from '../../service/providers';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { locale, dict } = await getClientDictionary();
  return (
    /* IMPORTANTE: Usamos o Providers aqui para que o ThemeSwitch e o LanguageDropdown 
       tenham acesso aos contextos (Settings, Theme, I18n), mas como este é o layout 
       de (auth), ele não terá o Sidebar (que está em outro Route Group).
    */
    <Providers locale={locale} dictionary={dict}>
      <div className="relative min-h-screen flex items-center justify-center bg-background/50 overflow-hidden">
        {/* Fundo Decorativo para o Museu (Opcional) */}
        <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
          {/* Aqui você poderia colocar uma marca d'água do brasão de Birigui ou textura de papel antigo */}
        </div>

        {/* CANTO SUPERIOR ESQUERDO: Nome do Sistema */}
        <div className="absolute top-6 left-6 md:top-8 md:left-8 hidden sm:flex items-center gap-2 z-10">
          <span className="text-xl font-black tracking-tighter text-primary uppercase">
            {dict.app.name}
          </span>
        </div>

        {/* CANTO SUPERIOR DIREITO: Seletores */}
        <div className="fixed top-4 right-4 md:top-8 md:right-8 z-50 flex items-center gap-2">
          <LanguageDropdown />
          <ThemeSwitch />
        </div>

        {/* CENTRO: O Formulário */}
        <main className="relative z-10 w-full flex items-center justify-center p-4 md:p-8 animate-in fade-in zoom-in duration-500">
          {children}
        </main>
      </div>
    </Providers>
  );
}
