// _components/ActionButtons.tsx
import { Button } from "@/components/ui/button";

export const ActionButtons = ({
  addState,
  addVariantColumn,
  removeVariantColumn,
}: {
  addState: () => void;
  addVariantColumn: () => void;
  removeVariantColumn: () => void;
}) => {
  return (
    <div className="flex space-x-2">
      <Button onClick={addState}>Add State</Button>
      <Button onClick={addVariantColumn}>Add Variant</Button>
      <Button onClick={removeVariantColumn}>Remove Variant</Button>
    </div>
  );
};
