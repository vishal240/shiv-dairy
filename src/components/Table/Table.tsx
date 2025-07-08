import React from 'react';
import { Check } from 'react-feather';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableRow {
  id: string | number;
  [key: string]: any;
}

interface TableProps {
  columns: TableColumn[];
  data: TableRow[];
  loading?: boolean;
  selectable?: boolean;
  selectedRows?: (string | number)[];
  onRowSelect?: (rowId: string | number) => void;
  onSelectAll?: (selected: boolean) => void;
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  renderCell?: (column: TableColumn, row: TableRow, value: any) => React.ReactNode;
  emptyMessage?: string;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  loading = false,
  selectable = false,
  selectedRows = [],
  onRowSelect,
  onSelectAll,
  onSort,
  sortColumn,
  sortDirection,
  renderCell,
  emptyMessage = "No data available"
}) => {
  const isAllSelected = data.length > 0 && selectedRows.length === data.length;
  const isIndeterminate = selectedRows.length > 0 && selectedRows.length < data.length;

  const handleSelectAll = () => {
    if (onSelectAll) {
      onSelectAll(!isAllSelected);
    }
  };

  const handleRowSelect = (rowId: string | number) => {
    if (onRowSelect) {
      onRowSelect(rowId);
    }
  };

  const handleSort = (column: TableColumn) => {
    if (!column.sortable || !onSort) return;
    
    const newDirection = 
      sortColumn === column.key && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(column.key, newDirection);
  };

  if (loading) {
    return (
      <div className="data_table">
        <div className="text-center py-4">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <table className="data_table">
      <thead>
        <tr>
          {selectable && (
            <th style={{ width: '50px' }}>
              <input
                id="select-all"
                className="chx_input"
                type="checkbox"
                checked={isAllSelected}
                ref={(input) => {
                  if (input) input.indeterminate = isIndeterminate;
                }}
                onChange={handleSelectAll}
              />
              <label className="chx_lbl" htmlFor="select-all">
                <Check />
              </label>
            </th>
          )}
          {columns.map((column) => (
            <th
              key={column.key}
              style={{ 
                width: column.width,
                textAlign: column.align || 'left',
                cursor: column.sortable ? 'pointer' : 'default'
              }}
              onClick={() => handleSort(column)}
            >
              <div className="d-flex align-items-center gap-1">
                {column.label}
                {column.sortable && sortColumn === column.key && (
                  <span className="font-10">
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length + (selectable ? 1 : 0)} className="text-center py-4">
              {emptyMessage}
            </td>
          </tr>
        ) : (
          data.map((row) => (
            <tr key={row.id}>
              {selectable && (
                <td>
                  <input
                    id={`select-${row.id}`}
                    className="chx_input"
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleRowSelect(row.id)}
                  />
                  <label className="chx_lbl" htmlFor={`select-${row.id}`}>
                    <Check />
                  </label>
                </td>
              )}
              {columns.map((column) => (
                <td
                  key={column.key}
                  style={{ textAlign: column.align || 'left' }}
                >
                  {renderCell 
                    ? renderCell(column, row, row[column.key])
                    : row[column.key]
                  }
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;