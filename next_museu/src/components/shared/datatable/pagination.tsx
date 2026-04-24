import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { getPageNumbers } from '../../../lib/utils';
import { Button } from '../../ui/button';

interface PaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: PaginationProps<TData>) {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();
  const pageNumbers = getPageNumbers(currentPage, totalPages);
  return (
    <div className="w-full border-t pt-4 mt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* MOBILE: tudo empilhado */}
        <div className="flex flex-col gap-4 w-full sm:flex-row sm:items-center sm:gap-6 justify-center">
          {/*  Select - ocupa linha inteira no mobile */}
          <div className="w-full sm:w-auto">
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <SelectTrigger className="h-8 w-full sm:w-[90px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent side="top">
                {[5, 10, 15, 20].map((size) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Texto total de páginas */}
          <div className="text-sm text-muted-foreground text-center sm:text-left w-full sm:w-auto">
            Página {currentPage} de {totalPages}
          </div>

          {/*  Barra de paginação */}
          <div className="flex items-center justify-center gap-1 w-full sm:w-auto overflow-x-auto whitespace-nowrap">
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex"
              onClick={() => table.setPageIndex(1)}
              disabled={!table.getCanPreviousPage()}
            >
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>

            {pageNumbers.map((page, index) =>
              page === '...' ? (
                <span
                  key={index}
                  className="px-2 text-sm text-muted-foreground"
                >
                  ...
                </span>
              ) : (
                <Button
                  key={index}
                  variant={currentPage === page ? 'default' : 'ghost'}
                  size="sm"
                  className="min-w-8"
                  onClick={() => table.setPageIndex((page as number) - 1)}
                >
                  {page}
                </Button>
              ),
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
