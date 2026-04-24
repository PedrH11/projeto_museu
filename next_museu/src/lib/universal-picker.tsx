'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { OnChangeFn, RowSelectionState } from '@tanstack/react-table';
import * as React from 'react';
import { DataTable } from '../components/datatable/data-table';

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
        className="w-[400px] sm:w-[600px] overflow-y-auto"
      >
        <div className="py-4">
          <h2 className="text-lg font-bold mb-4">{title}</h2>

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
