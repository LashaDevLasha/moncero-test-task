import React, { useMemo, useCallback } from "react";
import { Table, ConfigProvider } from "antd/lib";
import type { ColumnType } from "antd/es/table";
import useWindowSize from "@/hooks/window-size";

interface DataTableProps<T> {
  columns: (ColumnType<T> & { canSort?: boolean; canFilter?: boolean })[];
  data: T[];
  rowKey: string;
}

const CustomTable = <T extends Record<string, unknown>>({
  columns,
  data,
  rowKey,
}: DataTableProps<T>) => {
  const { width } = useWindowSize(); 
  const fontSize = width < 768 ? 12 : 18; 

  const getSorter = useCallback(
    (column: ColumnType<T>) => {
      return (a: T, b: T) => {
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
      };
    },
    []
  );

  const modifiedColumns = useMemo(
    () =>
      columns?.map((column) => {
        let modifiedColumn = { ...column };

        if (column.canSort) {
          modifiedColumn = {
            ...modifiedColumn,
            sorter: getSorter(column),
          };
        }

        if (column.canFilter) {
          const dataIndex = column.dataIndex as keyof T;
          const uniqueValues = Array.from(
            new Set(data.map((item) => item[dataIndex]))
          );

          modifiedColumn = {
            ...modifiedColumn,
            filters: uniqueValues.map((value, index) => ({
              text: String(value),
              value: String(value),
              key: `${String(value)}-${index}`,
            })),
            onFilter: (value, record) => record[dataIndex] === value,
          };
        }

        return modifiedColumn;
      }),
    [columns, data, getSorter]
  );

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            colorBgContainer: "#06080f",
            colorTextHeading: "#ffffff",
            colorText: "white",
            borderRadius: 8,
            headerBg: "rgb(15, 20, 35)",
            headerSortHoverBg: "rgb(20, 30, 50)",
            headerSplitColor: "transparent",
            borderColor: "transparent",
            filterDropdownBg: "white",
            rowSelectedBg: "rgb(20, 30, 50)",
            fixedHeaderSortActiveBg: "rgb(20, 30, 50)",
            headerSortActiveBg: "rgb(20, 30, 50)",
            filterDropdownMenuBg: "rgb(10, 15, 30)",
            headerFilterHoverBg: "rgb(10, 15, 30)",
            fontFamily: "'Playfair Display', serif",
            fontSize, 
          },
        },
      }}
    >
      <Table<T>
        columns={modifiedColumns}
        dataSource={data}
        rowKey={rowKey}
        pagination={false}
        style={{ maxWidth: "800px", margin: "0 auto" }}
      />
    </ConfigProvider>
  );
};

export default CustomTable;
