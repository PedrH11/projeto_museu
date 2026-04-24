'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, Eye, ShieldUser, Trash } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { RolesResponse } from '../../../schemas/roles-schemas';
import { ApiResponse, PageResponse } from '../../../type/api';

export const getRolesColumns = (
  result: ApiResponse<PageResponse<RolesResponse>>,
): ColumnDef<RolesResponse>[] => {
  const canView = !!result._links?.self || !!result._links?.list;
  const canUpdate = !!result._links?.update;
  const canDelete = !!result._links?.delete;

  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="selecionar tudo"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="selecionar a linha"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'nomeRoles',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      id: 'actions',
      header: () => <div className="text-center font-bold">Ações</div>,
      cell: ({ row }) => {
        const roles = row.original;

        return (
          <div className="flex items-center justify-center gap-2">
            {/* Visualizar */}
            {canView && (
              <Button variant="outline" size="icon" asChild title="Visualizar">
                <Link href={`/dashboard/roles/${roles.idRoles}/consultar`}>
                  <Eye className="h-4 w-4 text-blue-800" />
                </Link>
              </Button>
            )}

            {/* Editar */}
            {canUpdate && (
              <Button variant="outline" size="icon" asChild title="Editar">
                <Link href={`/dashboard/roles/${roles.idRoles}/editar`}>
                  <Edit className="h-4 w-4 text-emerald-950" />
                </Link>
              </Button>
            )}

            {/* Excluir */}
            {canDelete && (
              <Button variant="outline" size="icon" asChild title="Excluir">
                <Link href={`/dashboard/roles/${roles.idRoles}/excluir`}>
                  <Trash className="h-4 w-4 text-red-800" />
                </Link>
              </Button>
            )}
            <Button variant="outline" size="icon" asChild title="Excluir">
              <Link
                href={`/dashboard/permissions/manager/${roles.nomeRoles.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <ShieldUser className="h-4 w-4 text-purple-950" />
              </Link>
            </Button>
          </div>
        );
      },
    },
  ];
};
