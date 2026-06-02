// columns-roles.tsx
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { DictionaryType } from '../../../type/type';

export const getResourcesColumns = (dict: DictionaryType): ColumnDef<any>[] => {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label={dict.resources.management.select_all}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label={dict.resources.management.select_row}
        />
      ),
    },
    {
      accessorKey: 'nomeResources', 
      header: dict.resources.form.label.nameResources,
      size: 400,
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("nomeResources")}</div>
      ),
    },
  ];
};
