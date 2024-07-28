"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

export interface State {
  id: string;
  productFilter: string[];
  primaryVariant: string;
  variant2: string;
  variant3: string;
}

export const columns: ColumnDef<State>[] = [
  {
    accessorKey: "productFilter",
    header: "Product Filter",
    cell: ({ row }) => {
      return <div>{row.getValue("productFilter")}</div>;
    },
  },
  {
    accessorKey: "primaryVariant",
    header: "Primary Variant",
    cell: ({ row }) => <div>{row.getValue("primaryVariant")}</div>,
  },
  {
    accessorKey: "variant2",
    header: "Variant 2",
    cell: ({ row }) => {
      console.log(row.getValue("variant2"));
      return <div>{row.getValue("variant2")}</div>;
    },
  },
  {
    accessorKey: "variant3",
    header: "Variant 3",
    cell: ({ row }) => <div>{row.getValue("variant3")}</div>,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button variant="outline">Edit</Button>
        <Button variant="destructive">Delete</Button>
      </div>
    ),
  },
];
