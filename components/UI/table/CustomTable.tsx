import React from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';

interface DataTableProps<T> {
  columns: TableProps<T>['columns'];
  data: T[];
  sortable?: boolean;  // Optional sortable flag
}

const CustomTable = <T extends object>({ columns, data, sortable }: DataTableProps<T>) => {
  // If sortable is true, ensure all columns are sortable
  const modifiedColumns = columns?.map((column) => ({
    ...column,
    sorter: sortable
      ? (a: T, b: T) => {
          if ('dataIndex' in column) {
            const aValue = a[column.dataIndex as keyof T];
            const bValue = b[column.dataIndex as keyof T];
            // Handle sorting for various data types (numbers, strings)
            if (aValue > bValue) return 1;
            if (aValue < bValue) return -1;
            return 0;
          }
          return 0;
        }
      : column.sorter, // Retain any existing sorter logic if provided
  }));

  return <Table<T> columns={modifiedColumns} dataSource={data} />;
};

export default CustomTable;
