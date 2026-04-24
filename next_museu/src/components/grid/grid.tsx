'use client';

import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  templateColumns?: string;
  templateRows?: string;
  templateAreas?: string;
  autoFlow?: 'row' | 'col' | 'dense' | 'row-dense' | 'col-dense';
  gap?: number | string;
  inline?: boolean;
  asChild?: boolean;
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      templateColumns,
      templateRows,
      templateAreas,
      autoFlow,
      gap,
      inline,
      asChild = false,
      style,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'div';

    const autoFlowClasses = {
      row: 'grid-flow-row',
      col: 'grid-flow-col',
      dense: 'grid-flow-dense',
      'row-dense': 'grid-flow-row-dense',
      'col-dense': 'grid-flow-col-dense',
    };

    return (
      <Comp
        ref={ref}
        className={cn(inline ? 'inline-grid' : 'grid', autoFlow && autoFlowClasses[autoFlow], className)}
        style={{
          gridTemplateColumns: templateColumns,
          gridTemplateRows: templateRows,
          gridTemplateAreas: templateAreas,
          gap: gap ? (typeof gap === 'number' ? `${gap * 0.25}rem` : gap) : undefined,
          ...style,
        }}
        {...props}
      />
    );
  },
);

Grid.displayName = 'Grid';

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  area?: string;
  colSpan?: number | 'auto';
  colStart?: number | string;
  colEnd?: number | string;
  rowSpan?: number | 'auto';
  rowStart?: number | string;
  rowEnd?: number | string;
  asChild?: boolean;
}

export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  (
    { className, area, colSpan, colStart, colEnd, rowSpan, rowStart, rowEnd, asChild = false, style, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'div';

    const getSpan = (span?: number | 'auto') => {
      if (!span) return undefined;
      return span === 'auto' ? 'auto' : `span ${span} / span ${span}`;
    };

    return (
      <Comp
        ref={ref}
        className={cn(className)}
        style={{
          gridArea: area,
          gridColumn: getSpan(colSpan),
          gridRow: getSpan(rowSpan),
          gridColumnStart: colStart,
          gridColumnEnd: colEnd,
          gridRowStart: rowStart,
          gridRowEnd: rowEnd,
          ...style,
        }}
        {...props}
      />
    );
  },
);

GridItem.displayName = 'GridItem';
