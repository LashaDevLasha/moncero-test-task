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

  const cellFontSize = useMemo(() => {
    if (width < 480) return 12;
    if (width < 768) return 14;
    return 16;
  }, [width]);

  const cellPaddingBlock = useMemo(() => {
    if (width < 480) return 8;
    if (width < 768) return 12;
    return 16;
  }, [width]);

  const cellPaddingInline = useMemo(() => {
    if (width < 480) return 8;
    if (width < 768) return 12;
    return 16;
  }, [width]);

  const getSorter = useCallback((column: ColumnType<T>) => {
    return (a: T, b: T) => {
      const dataIndex = column.dataIndex as keyof T;
      const aValue = a[dataIndex];
      const bValue = b[dataIndex];

      const aNumeric = !isNaN(Number(aValue)) ? Number(aValue) : aValue;
      const bNumeric = !isNaN(Number(bValue)) ? Number(bValue) : bValue;

      if (typeof aNumeric === "number" && typeof bNumeric === "number") {
        return aNumeric - bNumeric;
      }

      if (typeof aNumeric === "string" && typeof bNumeric === "string") {
        return aNumeric.localeCompare(bNumeric);
      }

      if (aValue instanceof Date && bValue instanceof Date) {
        return aValue.getTime() - bValue.getTime();
      }

      return 0;
    };
  }, []);

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
          ).map((value) => {
            return isNaN(Number(value)) ? value : Number(value);
          });

          modifiedColumn = {
            ...modifiedColumn,
            filters: uniqueValues.map((value, index) => ({
              text: String(value),
              value: String(value),
              key: `${String(value)}-${index}`,
            })),
            onFilter: (value, record) => {
              const recordValue = record[dataIndex];

              return typeof recordValue === "number"
                ? recordValue === Number(value)
                : String(recordValue) === value;
            },
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
            fontSize: cellFontSize,
            cellPaddingBlock,
            cellPaddingInline,
            fontFamily: "'Lexend', sans-serif",
            fontWeightStrong: 200,
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
