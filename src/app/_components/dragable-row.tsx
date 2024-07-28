// @ts-nocheck
// import { useState, useEffect } from "react";
// import { useDrag, useDrop } from "react-dnd";
// import { flexRender, Row } from "@tanstack/react-table";
// import Image from "next/image";
// import { Grip, Trash, Edit, CheckCircle } from "lucide-react";
// import { State } from "./columns";
// import { TableCell, TableRow } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { FancyMultiSelect } from "./fancy-multiselect";
// import { Badge } from "@/components/ui/badge";

// const dressOptions = [
//   { value: "kurti", label: "Kurti" },
//   { value: "shirt", label: "Shirt" },
//   { value: "pant", label: "Pant" },
//   { value: "Anarkali Kurta", label: "Anarkali Kurta" },
//   { value: "lehenga", label: "Lehenga" },
//   { value: "saree", label: "Saree" },
//   { value: "tshirt", label: "T-shirt" },
//   { value: "jeans", label: "Jeans" },
//   { value: "shorts", label: "Shorts" },
//   { value: "skirt", label: "Skirt" },
// ];

// export const DraggableRow: React.FC<{
//   row: Row<State>;
//   reorderRow: (draggedRowIndex: number, targetRowIndex: number) => void;
//   removeState: (id: string) => void;
//   updateState: (updatedRow: State) => void;
// }> = ({ row, reorderRow, removeState, updateState }) => {
//   const [, dropRef] = useDrop({
//     accept: "row",
//     drop: (draggedRow: Row<State>) => {
//       reorderRow(draggedRow.index, row.index);
//       setIsEditing(false);
//     },
//   });

//   const [{ isDragging }, dragRef, previewRef] = useDrag({
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//     item: () => row,
//     type: "row",
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [editData, setEditData] = useState<State>(row.original);

//   useEffect(() => {
//     if (isEditing) {
//       setEditData(row.original);
//     }
//   }, [row.original, isEditing]);

//   const handleEditChange = (field: keyof State, value: any) => {
//     setEditData({ ...editData, [field]: value });
//   };

//   const handleImageChange = (field: keyof State, rowId: string, event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const updatedData = data.map((row) => (row.id === rowId ? { ...row, [field]: reader.result } : row));
//         setData(updatedData);
//         localStorage.setItem("tableData", JSON.stringify(updatedData));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSave = () => {
//     updateState(editData);
//     setIsEditing(false);
//   };

//   return (
//     <TableRow ref={previewRef} className={isDragging ? "opacity-50" : "opacity-100"}>
//       <TableCell ref={dropRef} className="h-full min-w-[50px] flex justify-between items-center ">
//         <div className="flex items-center">
//           <span className="mr-2">{row.original.id}</span>
//           <Button variant="ghost" ref={dragRef} className="cursor-move">
//             <Grip />
//           </Button>
//           {isEditing ? (
//             <CheckCircle className="text-green-500 cursor-pointer mr-2" onClick={handleSave} />
//           ) : (
//             <Edit className="text-blue-500 cursor-pointer mr-2" onClick={() => setIsEditing(true)} />
//           )}
//           <Trash onClick={() => removeState(row.original.id)} className="text-red-500 cursor-pointer" />
//         </div>
//       </TableCell>
//       {row
//         .getVisibleCells()
//         .slice(1)
//         .map((cell) => (
//           <TableCell
//             key={cell.id}
//             style={{
//               width: cell.column.getSize(),
//               minWidth: cell.column.columnDef.minSize,
//               maxWidth: cell.column.columnDef.maxSize,
//             }}
//           >
//             {isEditing ? (
//               cell.column.id === "productFilter" ? (
//                 <FancyMultiSelect
//                   options={dressOptions}
//                   selectedOptions={editData[cell.column.id] || []}
//                   onChange={(selected) => handleEditChange(cell.column.id as keyof State, selected)}
//                 />
//               ) : cell.column.id.startsWith("variant") || cell.column.id.startsWith("primaryVariant") ? (
//                 <>
//                   <div
//                     className="cursor-pointer border-2 border-dashed border-gray-400 p-2 rounded-md"
//                     onClick={() => document.getElementById(`fileInput-${cell.id}`).click()}
//                   >
//                     {editData[cell.column.id] ? (
//                       <Image src={editData[cell.column.id] as string} alt="Uploaded Image" width={50} height={50} />
//                     ) : (
//                       "Click to upload"
//                     )}
//                   </div>
//                   <input
//                     id={`fileInput-${cell.id}`}
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => handleImageChange(cell.column.id as keyof State, e)}
//                     style={{ display: "none" }}
//                   />
//                 </>
//               ) : (
//                 <input
//                   value={editData[cell.column.id] as string}
//                   onChange={(e) => handleEditChange(cell.column.id as keyof State, e.target.value)}
//                 />
//               )
//             ) : cell.column.id === "productFilter" ? (
//               editData[cell.column.id]?.map((filter, index) => (
//                 <Badge variant="secondary" key={index} className="mr-2 mt-1">
//                   {filter}
//                 </Badge>
//               ))
//             ) : cell.column.id.startsWith("variant") || cell.column.id.startsWith("primaryVariant") ? (
//               editData[cell.column.id] ? (
//                 <Image src={editData[cell.column.id] as string} alt="Uploaded Image" width={50} height={50} />
//               ) : (
//                 "No Image"
//               )
//             ) : (
//               flexRender(cell.column.columnDef.cell, cell.getContext())
//             )}
//           </TableCell>
//         ))}
//     </TableRow>
//   );
// };

import { useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { flexRender, Row } from "@tanstack/react-table";
import Image from "next/image";
import { Grip, Trash, Edit, CheckCircle } from "lucide-react";
import { State } from "./columns";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FancyMultiSelect } from "./fancy-multiselect";
import { Badge } from "@/components/ui/badge";

const dressOptions = [
  { value: "kurti", label: "Kurti" },
  { value: "shirt", label: "Shirt" },
  { value: "pant", label: "Pant" },
  { value: "Anarkali Kurta", label: "Anarkali Kurta" },
  { value: "lehenga", label: "Lehenga" },
  { value: "saree", label: "Saree" },
  { value: "tshirt", label: "T-shirt" },
  { value: "jeans", label: "Jeans" },
  { value: "shorts", label: "Shorts" },
  { value: "skirt", label: "Skirt" },
];

export const DraggableRow: React.FC<{
  row: Row<State>;
  data: State[];
  reorderRow: (draggedRowIndex: number, targetRowIndex: number) => void;
  removeState: (id: string) => void;
  updateState: (updatedRow: State) => void;
}> = ({ row, data, reorderRow, removeState, updateState }) => {
  const [, dropRef] = useDrop({
    accept: "row",
    drop: (draggedRow: { index: number }) => {
      reorderRow(draggedRow.index, row.index);
    },
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    type: "row",
    item: { index: row.index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<State>(row.original);

  useEffect(() => {
    if (!isEditing) {
      setEditData(row.original);
    }
  }, [row.original, isEditing]);

  const handleEditChange = (field: keyof State, value: any) => {
    setEditData({ ...editData, [field]: value });
  };

  const handleImageChange = (field: keyof State, rowId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedData = { ...editData, [field]: reader.result };
        setEditData(updatedData);
        updateState(updatedData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateState(editData);
    setIsEditing(false);
  };

  return (
    <TableRow ref={previewRef} className={isDragging ? "opacity-50" : "opacity-100"}>
      <TableCell ref={dropRef} className="h-full min-w-[50px] flex justify-between items-center">
        <div className="flex items-center">
          <span className="mr-2">{row.original.id}</span>
          <Button variant="ghost" ref={dragRef} className="cursor-move">
            <Grip />
          </Button>
          {isEditing ? (
            <CheckCircle className="text-green-500 cursor-pointer mr-2" onClick={handleSave} />
          ) : (
            <Edit className="text-blue-500 cursor-pointer mr-2" onClick={() => setIsEditing(true)} />
          )}
          <Trash onClick={() => removeState(row.original.id)} className="text-red-500 cursor-pointer" />
        </div>
      </TableCell>
      {row
        .getVisibleCells()
        .slice(1)
        .map((cell) => {
          let cellContent;

          if (isEditing) {
            if (cell.column.id === "productFilter") {
              cellContent = (
                <FancyMultiSelect
                  options={dressOptions}
                  selectedOptions={editData[cell.column.id] || []}
                  onChange={(selected) => handleEditChange(cell.column.id as keyof State, selected)}
                />
              );
            } else if (cell.column.id.startsWith("variant") || cell.column.id.startsWith("primaryVariant")) {
              cellContent = (
                <>
                  <div
                    className="cursor-pointer border-2 border-dashed border-gray-400 p-2 rounded-md"
                    onClick={() => document.getElementById(`fileInput-${cell.id}`).click()}
                  >
                    {editData[cell.column.id] ? (
                      <Image src={editData[cell.column.id] as string} alt="Uploaded Image" width={50} height={50} />
                    ) : (
                      "Click to upload"
                    )}
                  </div>
                  <input
                    id={`fileInput-${cell.id}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(cell.column.id as keyof State, row.original.id, e)}
                    style={{ display: "none" }}
                  />
                </>
              );
            } else {
              cellContent = (
                <input
                  value={editData[cell.column.id] as string}
                  onChange={(e) => handleEditChange(cell.column.id as keyof State, e.target.value)}
                />
              );
            }
          } else {
            if (cell.column.id === "productFilter") {
              cellContent = (
                <div>
                  {editData[cell.column.id]?.map((filter, index) => (
                    <Badge variant="secondary" key={index} className="mr-2 mt-1">
                      {filter}
                    </Badge>
                  ))}
                </div>
              );
            } else if (cell.column.id.startsWith("variant") || cell.column.id.startsWith("primaryVariant")) {
              cellContent = (
                <div>
                  {editData[cell.column.id] ? (
                    <Image src={editData[cell.column.id] as string} alt="Uploaded Image" width={50} height={50} />
                  ) : (
                    "No Image"
                  )}
                </div>
              );
            } else {
              cellContent = flexRender(cell.column.columnDef.cell, cell.getContext());
            }
          }

          return (
            <TableCell
              key={cell.id}
              style={{
                width: cell.column.getSize(),
                minWidth: cell.column.columnDef.minSize,
                maxWidth: cell.column.columnDef.maxSize,
              }}
            >
              {cellContent}
            </TableCell>
          );
        })}
    </TableRow>
  );
};
