'use client';

import { LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { listarEventosAction } from '../../actions/event/buscar-event-actions';
import { useDictionary } from '../../service/providers/i18n-providers';
import { ApiResponse } from '../../type/api';
import { type CalendarEvent } from '../../type/type';
import { EventCalendar } from '../forms/evento/event-calendar';
import { ToastHandler } from '../message/DisplayMessage';
import { PageShell } from '../pageshell/page-shell';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function ListEvent({
  result,
  initialDates,
}: {
  result: ApiResponse<CalendarEvent[]>;
  initialDates: { start: string; end: string };
}) {
  const [search, setSearch] = React.useState<string>('');
  const [dates, setDates] = React.useState(initialDates);
  const [events, setEvents] = React.useState<CalendarEvent[]>(result?.dados || []);
  const [loading, setLoading] = React.useState(false);
  const dict = useDictionary();

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const novosDados = await listarEventosAction(search, dates.start, dates.end);

      if (novosDados?.dados) {
        setEvents(novosDados.dados);
      }
    } catch (error) {
      console.error('Erro ao buscar eventos do museu:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleEventAdd = (event: CalendarEvent) => {
    setEvents([...events, event]);
  };

  const handleEventUpdate = (updatedEvent: CalendarEvent) => {
    setEvents(events.map((event) => (event.idEvent === updatedEvent.idEvent ? updatedEvent : event)));
  };

  const handleEventDelete = (eventId: string) => {
    setEvents(events.filter((event) => event.idEvent !== eventId));
  };

  return (
    <section aria-labelledby="events-heading">
      {result.mensagem && <ToastHandler message={result.mensagem} />}
      <PageShell
        title={dict.event.management.title}
        description={dict.event.management.description}
        headingId="events-heading"
             actions={
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans">
            <Link href="/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              {dict.navigation.dashboards}
            </Link>
          </Button>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 p-4 rounded-lg sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 items-end">
            {/* Campo: Nome do Evento */}
            <div className="flex flex-col gap-1.5 lg:col-span-1 xl:col-span-2">
              <label className="text-sm font-medium text-muted-foreground">{dict.search.search}</label>
              <Input
                placeholder={dict.search.inputPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Campo: Data Inicial */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-muted-foreground">Data Inicial:</label>
              <Input
                type="date"
                className="w-full"
                value={dates.start}
                onChange={(e) => setDates({ ...dates, start: e.target.value })}
              />
            </div>

            {/* Campo: Data Final */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-muted-foreground">Data Final:</label>
              <Input
                type="date"
                className="w-full"
                value={dates.end}
                onChange={(e) => setDates({ ...dates, end: e.target.value })}
              />
            </div>

            {/* Botão de Pesquisa */}
            <Button onClick={fetchEvents} disabled={loading} className="w-full sm:w-auto sm:self-end h-10">
              {loading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                dict.search.button
              )}
            </Button>
          </div>

          {/* Tabela de Dados */}
          <div className="rounded-xl border bg-card shadow-sm p-1">
            <EventCalendar
              events={events}
              onEventAdd={handleEventAdd}
              onEventUpdate={handleEventUpdate}
              onEventDelete={handleEventDelete}
            />
          </div>
        </div>
      </PageShell>
    </section>
  );
}
