'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Earth } from 'lucide-react';
import { useSettings } from '../../hooks/use-settings';
import { LocaleType } from '../../type/type';

export function LanguageDropdown() {
  const { settings, updateSettings } = useSettings();

  const currentLocale = settings.locale as LocaleType;

  const handleLocaleChange = (newLocale: string) => {
    updateSettings({
      ...settings,
      locale: newLocale as LocaleType,
    });
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 rounded-full h-9 px-3 border-muted-foreground/20 bg-sidebar"
        >
          <Earth className="size-4 text-muted-foreground" />
          <span className="text-xs font-bold uppercase">{currentLocale}</span>
          <ChevronDown className="size-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Idioma / Language</div>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={currentLocale} onValueChange={handleLocaleChange}>
          <DropdownMenuRadioItem value="pt" className="cursor-pointer">
            Português (BR)
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="en" className="cursor-pointer">
            English (US)
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="es" className="cursor-pointer">
            Español (ES)
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
