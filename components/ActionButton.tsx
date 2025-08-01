"use client";

import { Ellipsis } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import DeleteAlert from "./DeleteAlert";
import { useState } from "react";

interface ActionButtonProps {
  editComponent?: React.ReactNode;
  onDelete?: () => void;
  deleteLabel?: string;
  deleteConfirmTitle?: string;
  deleteConfirmDescription?: string;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  editComponent,
  onDelete,
  deleteLabel = "Delete",
  deleteConfirmTitle = "Are you sure?",
  deleteConfirmDescription = "This action cannot be undone.",
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" disabled={disabled}>
          <Ellipsis className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-2 space-y-1">
        {editComponent}
        {onDelete && (
          <DeleteAlert
            onConfirm={onDelete}
            title={deleteConfirmTitle}
            description={deleteConfirmDescription}
            trigger={
              <Button
                variant="ghost"
                className="w-full justify-start text-sm text-red-600 hover:text-red-700"
              >
                {deleteLabel}
              </Button>
            }
          />
        )}
      </PopoverContent>
    </Popover>
  );
};

export default ActionButton;
