"use client";

import { ColumnDef, ColumnSizingState, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { State } from "./columns";
import { ColumnResizer } from "./column-resizer";
import { DraggableRow } from "./dragable-row";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ActionButtons } from "./action-buttons";
import { useState } from "react";

interface DataTableProps<TValue> {
  columns: ColumnDef<State, TValue>[];
  data: State[];
  setData: any;
  addState: () => void;
  removeState: (id: string) => void;
  updateState: (updatedRow: State) => void;
  addVariantColumn: () => void;
  removeVariantColumn: () => void;
  reorderRow: (draggedRowIndex: number, targetRowIndex: number) => void;
}

export const DataTable = <TValue,>({
  columns,
  data,
  setData,
  addState,
  removeState,
  updateState,
  addVariantColumn,
  removeVariantColumn,
  reorderRow,
}: DataTableProps<TValue>) => {
  const [colSizing, setColSizing] = useState<ColumnSizingState>({});

  const table = useReactTable({
    data,
    columns,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    onColumnSizingChange: setColSizing,
    state: {
      columnSizing: colSizing,
    },
  });

  return (
    <>
      <div className="flex mb-4">
        <ActionButtons
          addState={addState}
          addVariantColumn={addVariantColumn}
          removeVariantColumn={removeVariantColumn}
        />
      </div>
      <DndProvider backend={HTML5Backend}>
        <div className="px-4 rounded-md border">
          <Table style={{ minWidth: table.getTotalSize() }}>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="relative"
                      style={{
                        width: header.getSize(),
                        minWidth: header.column.columnDef.minSize,
                        maxWidth: header.column.columnDef.maxSize,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        <ColumnResizer header={header} />
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table
                  .getRowModel()
                  .rows.map((row) => (
                    <DraggableRow
                      key={row.id}
                      row={row}
                      data={data}
                      reorderRow={reorderRow}
                      removeState={removeState}
                      updateState={updateState}
                    />
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </DndProvider>
    </>
  );
};
