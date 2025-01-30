import React from "react";
import { Table } from "antd";
import type { ColumnType } from "antd/es/table";

interface DataTableProps<T> {
  columns: (ColumnType<T> & { canSort?: boolean; canFilter?: boolean })[];
  data: T[];
}

const CustomTable = <T extends Record<string, unknown>>({ columns, data }: DataTableProps<T>) => {
  const modifiedColumns = columns?.map((column) => {
    let modifiedColumn = { ...column };

    if (column.canSort) {
      modifiedColumn = {
        ...modifiedColumn,
        sorter: (a: T, b: T) => {
          const dataIndex = column.dataIndex as keyof T;
          const aValue = a[dataIndex];
          const bValue = b[dataIndex];

          if (typeof aValue === "number" && typeof bValue === "number") {
            return aValue - bValue;
          }
          if (typeof aValue === "string" && typeof bValue === "string") {
            return aValue.localeCompare(bValue);
          }
          if (aValue instanceof Date && bValue instanceof Date) {
            return aValue.getTime() - bValue.getTime();
          }
          return 0;
        },
        sortDirections: ['ascend', 'descend'],
      };
    }

    if (column.canFilter) {
      const dataIndex = column.dataIndex as keyof T;
      const uniqueValues = Array.from(new Set(data.map((item) => item[dataIndex])));

      modifiedColumn = {
        ...modifiedColumn,
        filters: uniqueValues.map((value) => ({
          text: String(value),
          value: String(value),
        })),
        onFilter: (value, record) => record[dataIndex] === value,
      };
    }

    return modifiedColumn;
  });

  return <Table<T> columns={modifiedColumns} dataSource={data} pagination={false} />;
};

export default CustomTable;
