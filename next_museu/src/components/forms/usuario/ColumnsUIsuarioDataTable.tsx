'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, Eye, Trash } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { UsuarioResponse } from '../../../schemas/usuario-schemas';
import { ApiResponse, PageResponse } from '../../../type/api';

export const getUsuarioColumns = (
  result: ApiResponse<PageResponse<UsuarioResponse>>,
): ColumnDef<UsuarioResponse>[] => {
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
      accessorKey: 'username',
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
      accessorKey: 'email',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          E-mail
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'active',
      header: 'Status',
      cell: ({ row }) => {
        const ativo = row.getValue('active');
        return (
          <Badge variant={ativo ? 'default' : 'destructive'}>
            {ativo ? 'Ativo' : 'Inativo'}
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      header: () => <div className="text-center font-bold">Ações</div>,
      cell: ({ row }) => {
        const usuario = row.original;

        return (
          <div className="flex items-center justify-center gap-2">
            {/* Visualizar */}
            {canView && (
              <Button variant="outline" size="icon" asChild title="Visualizar">
                <Link
                  href={`/dashboard/usuario/${usuario.idUsuario}/consultar`}
                >
                  <Eye className="h-4 w-4 text-blue-800" />
                </Link>
              </Button>
            )}

            {/* Editar */}
            {canUpdate && (
              <Button variant="outline" size="icon" asChild title="Editar">
                <Link href={`/dashboard/usuario/${usuario.idUsuario}/editar`}>
                  <Edit className="h-4 w-4 text-emerald-950" />
                </Link>
              </Button>
            )}

            {/* Excluir */}
            {canDelete && (
              <Button variant="outline" size="icon" asChild title="Excluir">
                <Link href={`/dashboard/usuario/${usuario.idUsuario}/excluir`}>
                  <Trash className="h-4 w-4 text-red-800" />
                </Link>
              </Button>
            )}
          </div>
        );
      },
    },
  ];
};
