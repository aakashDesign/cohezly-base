import {
  forwardRef,
  type HTMLAttributes,
  type TableHTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from 'react';
import { cn } from '../../lib/cn';
import './table.css';

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {}

export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  { className, children, ...props },
  ref,
) {
  return (
    <div className="ui-table__scroll">
      <table ref={ref} className={cn('ui-table', className)} {...props}>
        {children}
      </table>
    </div>
  );
});

export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {}

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  function TableHeader({ className, ...props }, ref) {
    return <thead ref={ref} className={cn('ui-table__header', className)} {...props} />;
  },
);

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  function TableBody({ className, ...props }, ref) {
    return <tbody ref={ref} className={cn('ui-table__body', className)} {...props} />;
  },
);

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  { className, selected, ...props },
  ref,
) {
  return (
    <tr
      ref={ref}
      data-selected={selected || undefined}
      className={cn('ui-table__row', className)}
      {...props}
    />
  );
});

export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {}

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(function TableHead(
  { className, ...props },
  ref,
) {
  return <th ref={ref} className={cn('ui-table__head-cell', className)} {...props} />;
});

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
  { className, ...props },
  ref,
) {
  return <td ref={ref} className={cn('ui-table__cell', className)} {...props} />;
});
