"use client";

import { useEffect, useState } from "react";
import { State } from "./_components/columns";
import { DataTable } from "./_components/data-table";

export default function Home() {
  const initialData: State[] = [
    {
      id: "1",
      productFilter: ["shirt"],
      primaryVariant: "",
      variant2: "",
      variant3: "",
    },
    {
      id: "2",
      productFilter: ["Anarkali Kurta"],
      primaryVariant: "",
      variant2: "",
      variant3: "",
    },
  ];

  const initialColumnDefs = [
    { accessorKey: "variant", header: "" },
    { accessorKey: "productFilter", header: "Product Filter" },
    { accessorKey: "primaryVariant", header: "Primary Variant" },
    { accessorKey: "variant2", header: "Variant 2" },
  ];

  const [data, setData] = useState<State[]>([]);
  const [columns, setColumns] = useState(initialColumnDefs);

  useEffect(() => {
    const storedData = localStorage.getItem("tableData");
    const storedColumns = localStorage.getItem("tableColumns");

    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      localStorage.setItem("tableData", JSON.stringify(initialData));
      setData(initialData);
    }

    if (storedColumns) {
      setColumns(JSON.parse(storedColumns));
    } else {
      localStorage.setItem("tableColumns", JSON.stringify(initialColumnDefs));
      setColumns(initialColumnDefs);
    }
  }, []);

  const storeDataToLocalStorage = () => {
    localStorage.removeItem("tableData");
    localStorage.removeItem("tableColumns");
    localStorage.setItem("tableData", JSON.stringify(initialData));
    localStorage.setItem("tableColumns", JSON.stringify(initialColumnDefs));
    setData(initialData);
    setColumns(initialColumnDefs);
    alert("Data initialized in local storage!");
  };

  const addState = () => {
    const newState = [
      ...data,
      { id: `${data.length + 1}`, productFilter: [], primaryVariant: "", variant2: "", variant3: "" },
    ];
    setData(newState);
    localStorage.setItem("tableData", JSON.stringify(newState));
  };

  const removeState = (id: string) => {
    const newState = data.filter((state) => state.id !== id);
    setData(newState);
    localStorage.setItem("tableData", JSON.stringify(newState));
  };

  const updateState = (updatedRow: State) => {
    const newState = data.map((state) => (state.id === updatedRow.id ? updatedRow : state));
    setData(newState);
    localStorage.setItem("tableData", JSON.stringify(newState));
  };

  const addVariantColumn = () => {
    const newColumns = [
      ...columns,
      {
        accessorKey: `variant${columns.length - 1}`,
        header: `Variant ${columns.length - 1}`,
      },
    ];
    setColumns(newColumns);
    localStorage.setItem("tableColumns", JSON.stringify(newColumns));
  };

  const removeVariantColumn = () => {
    const newColumns = columns.slice(0, -1);
    setColumns(newColumns);
    localStorage.setItem("tableColumns", JSON.stringify(newColumns));
  };

  const reorderRow = (draggedRowIndex: number, targetRowIndex: number) => {
    const newData = [...data];
    const [movedRow] = newData.splice(draggedRowIndex, 1);
    newData.splice(targetRowIndex, 0, movedRow);
    setData(newData);
    localStorage.setItem("tableData", JSON.stringify(newData));
  };

  return (
    <section className="container mt-6">
      <div className="mb-4">
        <button onClick={storeDataToLocalStorage} className="px-4 py-2 bg-blue-500 text-white rounded">
          Initialize Data in Local Storage
        </button>
      </div>
      <DataTable
        columns={columns}
        data={data}
        setData={setData}
        addState={addState}
        removeState={removeState}
        updateState={updateState}
        addVariantColumn={addVariantColumn}
        removeVariantColumn={removeVariantColumn}
        reorderRow={reorderRow}
      />
    </section>
  );
}
