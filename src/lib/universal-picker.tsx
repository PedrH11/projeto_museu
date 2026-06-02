'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { OnChangeFn, RowSelectionState } from '@tanstack/react-table';
import * as React from 'react';
import { DataTable } from '../components/shared/datatable/data-table';

interface UniversalPickerProps<T> {
  title: string;
  data: T[];
  columns: any[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
}

export function UniversalPicker<T extends { id: string | number }>({
  title,
  data,
  columns,
  selectedIds,
  onSelectionChange,
}: UniversalPickerProps<T>) {
  const rowSelectionState = React.useMemo(() => {
    return selectedIds.reduce(
      (acc, id) => ({ ...acc, [String(id)]: true }),
      {},
    );
  }, [selectedIds]);

  const handleTableChange: OnChangeFn<RowSelectionState> = (updaterOrValue) => {
    const newState =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(rowSelectionState)
        : updaterOrValue;

    const idsArray = Object.keys(newState).filter((key) => newState[key]);
    onSelectionChange(idsArray);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          Gerenciar Vinculações ({selectedIds.length})
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[90vw] md:w-[600px] lg:w-[800px] p-6 md:p-10 overflow-y-auto"
      >

        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl font-bold">{title}</SheetTitle>
          <SheetDescription className="sr-only">
            Selecione os itens para vincular ao registro atual.
          </SheetDescription>
        </SheetHeader>

        <div className="py-4">
          <DataTable
            columns={columns}
            data={data}
            selectedIds={rowSelectionState}
            onSelectionChange={handleTableChange}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
