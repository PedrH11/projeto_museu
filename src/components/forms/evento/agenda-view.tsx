'use client';

import { RiCalendarEventLine } from '@remixicon/react';
import { addDays, format, isToday } from 'date-fns';
import { enUS, es, ptBR } from 'date-fns/locale';
import { useMemo } from 'react';
import { getAgendaEventsForDay } from '../../../lib/event.utils';
import { AgendaDaysToShow } from '../../../service/constants/constants';
import { useDictionary } from '../../../service/providers/i18n-providers';
import { type CalendarEvent } from '../../../type/type';
import { EventItem } from './event-item';

interface AgendaViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventSelect: (event: CalendarEvent) => void;
}

const dateFnsLocales = {
  en: enUS,
  pt: ptBR,
  es: es,
};

export function AgendaView({ currentDate, events, onEventSelect }: AgendaViewProps) {
  const dict = useDictionary();
  const currentLang = (dict.lang as 'en' | 'pt' | 'es') || 'pt'; //
  const selectedLocale = dateFnsLocales[currentLang];
  // Show events for the next days based on constant
  const days = useMemo(() => {
    console.log('Agenda view updating with date:', currentDate.toISOString());
    return Array.from({ length: AgendaDaysToShow }, (_, i) => addDays(new Date(currentDate), i));
  }, [currentDate]);

  const handleEventClick = (event: CalendarEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Agenda view event clicked:', event);
    onEventSelect(event);
  };

  // Check if there are any days with events
  const hasEvents = days.some((day) => getAgendaEventsForDay(events, day).length > 0);

  return (
    <div className="border-border/70 border-t px-4">
      {!hasEvents ? (
        <div className="flex min-h-[70svh] flex-col items-center justify-center py-16 text-center">
          <RiCalendarEventLine size={32} className="text-muted-foreground/50 mb-2" />
          <h3 className="text-lg font-medium">{dict.event.agenda_view.no_events}</h3>
          <p className="text-muted-foreground">{dict.event.agenda_view.no_period}</p>
        </div>
      ) : (
        days.map((day) => {
          const dayEvents = getAgendaEventsForDay(events, day);

          if (dayEvents.length === 0) return null;

          return (
            <div key={day.toString()} className="border-border/70 relative my-12 border-t">
              <span
                className="bg-background absolute -top-3 left-0 flex h-6 items-center pe-4 text-[10px] uppercase data-today:font-medium sm:pe-4 sm:text-xs"
                data-today={isToday(day) || undefined}
              >
                {(() => {
                  // 'd MMM, EEEE' gera: 20 abr, segunda-feira
                  const formattedDate = format(day, 'd MMM, EEEE', { locale: selectedLocale });

                  // Capitalizamos a primeira letra para um visual mais profissional (ex: "Segunda" em vez de "segunda")
                  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
                })()}
              </span>
              <div className="mt-6 space-y-2">
                {dayEvents.map((event) => (
                  <EventItem
                    key={event.idEvent}
                    event={event}
                    view="agenda"
                    onClick={(e) => handleEventClick(event, e)}
                  />
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
