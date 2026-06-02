'use client';

import { RiCalendarCheckLine } from '@remixicon/react';
import {
  addDays,
  addMonths,
  addWeeks,
  endOfWeek,
  format,
  isSameMonth,
  startOfWeek,
  subMonths,
  subWeeks,
} from 'date-fns';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, PlusIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { enUS, es, ptBR } from 'date-fns/locale';
import { addHoursToDate } from '../../../lib/event.utils';
import { cn } from '../../../lib/utils';
import { AgendaDaysToShow, EventGap, EventHeight, WeekCellsHeight } from '../../../service/constants/constants';
import { CalendarDndProvider } from '../../../service/providers/calendar-dnd-context';
import { useDictionary } from '../../../service/providers/i18n-providers';
import { AgendaEvent, CalendarView, type CalendarEvent } from '../../../type/type';
import { AgendaView } from './agenda-view';
import { DayView } from './day-view';
import { EventDialog } from './event-dialog';
import { MonthView } from './month-view';
import { WeekView } from './week-view';

export interface EventCalendarProps {
  events?: CalendarEvent[];
  onEventAdd?: (event: CalendarEvent) => void;
  onEventUpdate?: (event: CalendarEvent) => void;
  onEventDelete?: (eventId: string) => void;
  className?: string;
  initialView?: CalendarView;
}

const dateFnsLocales = {
  en: enUS,
  pt: ptBR,
  es: es,
};

export function EventCalendar({
  events = [],
  onEventAdd,
  onEventUpdate,
  onEventDelete,
  className,
  initialView = AgendaEvent.MONTH,
}: EventCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>(initialView);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const dict = useDictionary();
  const currentLang = (dict.lang as 'en' | 'pt' | 'es') || 'pt'; //
  const selectedLocale = dateFnsLocales[currentLang];
  // Add keyboard shortcuts for view switching
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if user is typing in an input, textarea or contentEditable element
      // or if the event dialog is open
      if (
        isEventDialogOpen ||
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target instanceof HTMLElement && e.target.isContentEditable)
      ) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case 'm':
          setView(AgendaEvent.MONTH);
          break;
        case 'w':
          setView(AgendaEvent.WEEK);
          break;
        case 'd':
          setView(AgendaEvent.DAY);
          break;
        case 'a':
          setView(AgendaEvent.AGENDA);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEventDialogOpen]);

  const handlePrevious = () => {
    if (view === AgendaEvent.MONTH) {
      setCurrentDate(subMonths(currentDate, 1));
    } else if (view === AgendaEvent.WEEK) {
      setCurrentDate(subWeeks(currentDate, 1));
    } else if (view === AgendaEvent.DAY) {
      setCurrentDate(addDays(currentDate, -1));
    } else if (view === AgendaEvent.AGENDA) {
      // For agenda view, go back 30 days (a full month)
      setCurrentDate(addDays(currentDate, -AgendaDaysToShow));
    }
  };

  const handleNext = () => {
    if (view === AgendaEvent.MONTH) {
      setCurrentDate(addMonths(currentDate, 1));
    } else if (view === AgendaEvent.WEEK) {
      setCurrentDate(addWeeks(currentDate, 1));
    } else if (view === AgendaEvent.DAY) {
      setCurrentDate(addDays(currentDate, 1));
    } else if (view === AgendaEvent.AGENDA) {
      // For agenda view, go forward 30 days (a full month)
      setCurrentDate(addDays(currentDate, AgendaDaysToShow));
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleEventSelect = (event: CalendarEvent) => {
    //console.log('Event selected:', event); // Debug log
    setSelectedEvent(event);
    setIsEventDialogOpen(true);
  };

  const handleEventCreate = (startTime: Date) => {
    //console.log('Creating new event at:', startTime); // Debug log

    // Snap to 15-minute intervals
    const minutes = startTime.getMinutes();
    const remainder = minutes % 15;
    if (remainder !== 0) {
      if (remainder < 7.5) {
        // Round down to nearest 15 min
        startTime.setMinutes(minutes - remainder);
      } else {
        // Round up to nearest 15 min
        startTime.setMinutes(minutes + (15 - remainder));
      }
      startTime.setSeconds(0);
      startTime.setMilliseconds(0);
    }

    const newEvent: CalendarEvent = {
      idEvent: '',
      title: '',
      start_date: startTime,
      end_date: addHoursToDate(startTime, 1),
      allDay: false,
    };
    setSelectedEvent(newEvent);
    setIsEventDialogOpen(true);
  };

  const handleEventSave = (event: CalendarEvent) => {
    if (event.idEvent) {
      onEventUpdate?.(event);
      // Show toast notification when an event is updated
      toast(`${dict.event.calendar.event} "${event.title}" ${dict.event.calendar.update}`, {
        description: format(new Date(event.start_date), 'PPP', { locale: selectedLocale }),
        position: 'bottom-left',
      });
    } else {
      onEventAdd?.({
        ...event,
        idEvent: Math.random().toString(36).substring(2, 11),
      });
      // Show toast notification when an event is added
      toast(`${dict.event.calendar.event} "${event.title}" ${dict.event.calendar.add}`, {
        description: format(new Date(event.start_date), 'PPP', { locale: selectedLocale }),
        position: 'bottom-left',
      });
    }
    setIsEventDialogOpen(false);
    setSelectedEvent(null);
  };

  const handleEventDelete = (eventId: string) => {
    const deletedEvent = events.find((e) => e.idEvent === eventId);
    onEventDelete?.(eventId);
    setIsEventDialogOpen(false);
    setSelectedEvent(null);

    // Show toast notification when an event is deleted
    if (deletedEvent) {
      toast(`${dict.event.calendar.event} "${deletedEvent.title}" ${dict.event.calendar.deleted}`, {
        description: format(new Date(deletedEvent.start_date), 'PPP', { locale: selectedLocale }),
        position: 'bottom-left',
      });
    }
  };

  const handleEventUpdate = (updatedEvent: CalendarEvent) => {
    onEventUpdate?.(updatedEvent);

    // Show toast notification when an event is updated via drag and drop
    toast(`${dict.event.calendar.event} "${updatedEvent.title}" ${dict.event.calendar.moved}`, {
      description: format(new Date(updatedEvent.start_date), 'PPP', { locale: selectedLocale }),
      position: 'bottom-left',
    });
  };

  const viewTitle = useMemo(() => {
    const cap = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
    const opts = { locale: selectedLocale };
    if (view === AgendaEvent.MONTH) {
      return cap(format(currentDate, 'MMMM yyyy', opts));
    } else if (view === AgendaEvent.WEEK) {
      const start_date = startOfWeek(currentDate, { weekStartsOn: 0 });
      const end_date = endOfWeek(currentDate, { weekStartsOn: 0 });
      if (isSameMonth(start_date, end_date)) {
        return cap(format(start_date, 'MMMM yyyy', opts));
      } else {
        return `${cap(format(start_date, 'MMM', opts))} - ${cap(format(end_date, 'MMM yyyy', opts))}`;
      }
    } else if (view === AgendaEvent.DAY) {
      return (
        <>
          <span className="min-[480px]:hidden" aria-hidden="true">
            {format(currentDate, 'MMM d, yyyy', opts)}
          </span>
          <span className="max-[479px]:hidden min-md:hidden" aria-hidden="true">
            {format(currentDate, 'MMMM d, yyyy', opts)}
          </span>
          <span className="max-md:hidden">{cap(format(currentDate, 'EEE MMMM d, yyyy', opts))}</span>
        </>
      );
    } else if (view === AgendaEvent.AGENDA) {
      // Show the month range for agenda view
      const start_date = currentDate;
      const end_date = addDays(currentDate, AgendaDaysToShow - 1);

      if (isSameMonth(start_date, end_date)) {
        return cap(format(start_date, 'MMMM yyyy', opts));
      } else {
        return `${cap(format(start_date, 'MMM', opts))} - ${cap(format(end_date, 'MMM yyyy', opts))}`;
      }
    } else {
      return cap(format(currentDate, 'MMMM yyyy', opts));
    }
  }, [currentDate, view, selectedLocale]);

  return (
    <div
      style={
        {
          '--event-height': `${EventHeight}px`,
          '--event-gap': `${EventGap}px`,
          '--week-cells-height': `${WeekCellsHeight}px`,
        } as React.CSSProperties
      }
    >
      <CalendarDndProvider onEventUpdate={handleEventUpdate}>
        <div className={cn('flex items-center justify-between p-2 sm:p-4', className)}>
          <div className="flex items-center gap-1 sm:gap-4">
            <Button variant="outline" className="max-[479px]:aspect-square max-[479px]:p-0!" onClick={handleToday}>
              <RiCalendarCheckLine className="min-[480px]:hidden" size={16} aria-hidden="true" />
              <span className="max-[479px]:sr-only">{dict.event.calendar.today}</span>
            </Button>
            <div className="flex items-center sm:gap-2">
              <Button variant="ghost" size="icon" onClick={handlePrevious} aria-label="Previous">
                <ChevronLeftIcon size={16} aria-hidden="true" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleNext} aria-label="Next">
                <ChevronRightIcon size={16} aria-hidden="true" />
              </Button>
            </div>
            <h2 className="text-sm font-semibold sm:text-lg md:text-xl">{viewTitle}</h2>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1.5 max-[479px]:h-8">
                  <span>
                    <span className="min-[480px]:hidden" aria-hidden="true">
                      {/* Pegamos a inicial da tradução correta para o idioma atual */}
                      {view === AgendaEvent.MONTH && dict.event.calendar.month.charAt(0).toUpperCase()}
                      {view === AgendaEvent.WEEK && dict.event.calendar.week.charAt(0).toUpperCase()}
                      {view === AgendaEvent.DAY && dict.event.calendar.day.charAt(0).toUpperCase()}
                      {view === AgendaEvent.AGENDA && dict.event.calendar.agenda.charAt(0).toUpperCase()}
                    </span>

                    <span className="max-[479px]:sr-only">
                      {view === AgendaEvent.MONTH && dict.event.calendar.month}
                      {view === AgendaEvent.WEEK && dict.event.calendar.week}
                      {view === AgendaEvent.DAY && dict.event.calendar.day}
                      {view === AgendaEvent.AGENDA && dict.event.calendar.agenda}
                    </span>
                  </span>
                  <ChevronDownIcon className="-me-1 opacity-60" size={16} aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-32">
                <DropdownMenuItem onClick={() => setView(AgendaEvent.MONTH)}>
                  {dict.event.calendar.month} <DropdownMenuShortcut>M</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setView(AgendaEvent.WEEK)}>
                  {dict.event.calendar.week} <DropdownMenuShortcut>W</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setView(AgendaEvent.DAY)}>
                  {dict.event.calendar.day} <DropdownMenuShortcut>D</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setView(AgendaEvent.AGENDA)}>
                  {dict.event.calendar.agenda} <DropdownMenuShortcut>A</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              className="max-[479px]:aspect-square max-[479px]:p-0!"
              size="sm"
              onClick={() => {
                setSelectedEvent(null); // Ensure we're creating a new event
                setIsEventDialogOpen(true);
              }}
            >
              <PlusIcon className="opacity-60 sm:-ms-1" size={16} aria-hidden="true" />
              <span className="max-sm:sr-only">{dict.event.calendar.new_event}</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          {view === AgendaEvent.MONTH && (
            <MonthView
              currentDate={currentDate}
              events={events}
              onEventSelect={handleEventSelect}
              onEventCreate={handleEventCreate}
            />
          )}
          {view === AgendaEvent.WEEK && (
            <WeekView
              currentDate={currentDate}
              events={events}
              onEventSelect={handleEventSelect}
              onEventCreate={handleEventCreate}
            />
          )}
          {view === AgendaEvent.DAY && (
            <DayView
              currentDate={currentDate}
              events={events}
              onEventSelect={handleEventSelect}
              onEventCreate={handleEventCreate}
            />
          )}
          {view === AgendaEvent.AGENDA && (
            <AgendaView currentDate={currentDate} events={events} onEventSelect={handleEventSelect} />
          )}
        </div>

        <EventDialog
          event={selectedEvent}
          isOpen={isEventDialogOpen}
          onClose={() => {
            setIsEventDialogOpen(false);
            setSelectedEvent(null);
          }}
          onSave={handleEventSave}
          onDelete={handleEventDelete}
        />
      </CalendarDndProvider>
    </div>
  );
}
