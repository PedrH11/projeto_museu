// columns-roles.tsx
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { RolesResponse } from '../../../schemas/roles-schemas';
import { DictionaryType } from '../../../type/type';

export const getRoleColumns = (
  dict: DictionaryType,
): ColumnDef<RolesResponse>[] => {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label={dict.roles.management.select_all}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label={dict.roles.management.select_row}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'nomeRoles', 
      header: dict.roles.form.label.nameRole,
      size: 400,
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("nomeRoles")}</div>
      ),
    },
  ];
};
