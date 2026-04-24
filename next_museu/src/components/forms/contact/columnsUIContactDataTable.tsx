'use client';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, Eye, Trash } from 'lucide-react';
import Link from 'next/link';
import { ContactResponse } from '../../../schemas/contact-schema';
import { ApiResponse, PageResponse } from '../../../type/api';
import { Badge } from '../../ui/badge';
import { Checkbox } from '../../ui/checkbox';

export const getContactColumns = (
  result: ApiResponse<PageResponse<ContactResponse>>,
): ColumnDef<ContactResponse>[] => {
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
      accessorKey: 'firstName',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Nome
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: 'lastName',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Sobrenome
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: 'phone',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Telefone
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: 'email',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            E-mail
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status');

        return (
          <Badge variant={status ? 'default' : 'destructive'}>
            {status ? 'Aberto' : 'Fechado'}
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      header: () => <div className="text-center">Ações</div>,
      cell: ({ row }) => {
        const contato = row.original;

        return (
          <div className="flex items-center justify-center gap-2">
            {canView && (
              <Button
                variant="outline"
                size="icon"
                asChild
                title="Visualizar"
                aria-label="Consultar Registro do Usuário"
              >
                <Link
                  href={`/dashboard/contact/${contato.idContact}/consultar`}
                >
                  <Eye className="h-4 w-4 text-blue-800" />
                </Link>
              </Button>
            )}
            {canUpdate && (
              <Button
                variant="outline"
                size="icon"
                asChild
                title="Editar"
                aria-label="Editar Registro do Usuário"
              >
                <Link href={`/dashboard/contact/${contato.idContact}/editar`}>
                  <Edit className="h-4 w-4 text-amber-800" />
                </Link>
              </Button>
            )}
            {canDelete && (
              <Button variant="destructive" size="icon" title="Excluir">
                <Link
                  href={`/dashboard/contact/${contato.idContact}/excluir`}
                  aria-label="Excluir Registro do Usuário"
                >
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
