'use client';

import { format, isSameDay } from 'date-fns';
import { XIcon } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { type CalendarEvent } from '../../../type/type';
import { EventItem } from './event-item';

interface EventsPopupProps {
  date: Date;
  events: CalendarEvent[];
  position: { top: number; left: number };
  onClose: () => void;
  onEventSelect: (event: CalendarEvent) => void;
}

export function EventsPopup({ date, events, position, onClose, onEventSelect }: EventsPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const [adjustedPosition, setAdjustedPosition] = React.useState(position);

  // Handle click outside to close popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Handle escape key to close popup
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  const handleEventClick = (event: CalendarEvent) => {
    onEventSelect(event);
    onClose();
  };

  // Adjust position to ensure popup stays within viewport
  React.useLayoutEffect(() => {
    if (popupRef.current) {
      const rect = popupRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const newPosition = { ...position };

      // Ajuste horizontal
      if (newPosition.left + rect.width > viewportWidth) {
        newPosition.left = Math.max(0, viewportWidth - rect.width);
      }

      // Ajuste vertical
      if (newPosition.top + rect.height > viewportHeight) {
        newPosition.top = Math.max(0, viewportHeight - rect.height);
      }

      // Só atualiza se for realmente diferente para evitar loops
      setAdjustedPosition(newPosition);
    }
  }, [position]); // Executa sempre que a posição original mudar

  return (
    <div
      ref={popupRef}
      className="bg-background absolute z-50 max-h-96 w-80 overflow-auto rounded-md border shadow-lg"
      style={{
        top: `${adjustedPosition.top}px`,
        left: `${adjustedPosition.left}px`,
      }}
    >
      <div className="bg-background sticky top-0 flex items-center justify-between border-b p-3">
        <h3 className="font-medium">{format(date, 'd MMMM yyyy')}</h3>
        <button onClick={onClose} className="hover:bg-muted rounded-full p-1" aria-label="Close">
          <XIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-2 p-3">
        {events.length === 0 ? (
          <div className="text-muted-foreground py-2 text-sm">No events</div>
        ) : (
          events.map((event) => {
            const eventStart = new Date(event.start_date);
            const eventEnd = new Date(event.end_date);
            const isFirstDay = isSameDay(date, eventStart);
            const isLastDay = isSameDay(date, eventEnd);

            return (
              <div key={event.idEvent} className="cursor-pointer" onClick={() => handleEventClick(event)}>
                <EventItem event={event} view="agenda" isFirstDay={isFirstDay} isLastDay={isLastDay} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
