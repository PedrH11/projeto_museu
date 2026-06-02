import { DataTable } from "@/components/shared/datatable/data-table";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { OnChangeFn, RowSelectionState } from "@tanstack/react-table";
import React from "react";

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
  // Transformamos o array de IDs (['1', '2']) em um objeto de estado ({ '1': true, '2': true })
  const rowSelectionState = React.useMemo(() => {
    return selectedIds.reduce(
      (acc, id) => ({ ...acc, [String(id)]: true }),
      {},
    );
  }, [selectedIds]);

  const handleTableChange: OnChangeFn<RowSelectionState> = (updaterOrValue) => {
    // Resolve o novo estado (seja ele um valor direto ou uma função de atualização)
    const newState =
      typeof updaterOrValue === "function"
        ? updaterOrValue(rowSelectionState)
        : updaterOrValue;

    // Filtra apenas as chaves que estão marcadas como 'true'
    const idsArray = Object.keys(newState).filter((key) => newState[key]);

    // Retorna o array de IDs selecionados para o componente pai
    onSelectionChange(idsArray);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          Gerenciar Roles ({selectedIds.length})
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[90vw] md:w-[600px] lg:w-[800px] p-6 md:p-10 overflow-y-auto"
      >
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl font-bold">{title}</SheetTitle>
          <SheetDescription>
            Selecione uma ou mais permissões (roles) para este usuário.
          </SheetDescription>
        </SheetHeader>

        <div className="py-4">
          <DataTable
            columns={columns}
            data={data}
            selectedIds={rowSelectionState} // Objeto { id: true }
            onSelectionChange={handleTableChange}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
