import {
  Dialog,
  DialogHeader,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import React from "react";

interface RemovalProps {
  showRemoveDialog: boolean;
  handleShowRemoveDialog: () => void;
  handleRemoval: () => void;
}

export const ReviewRemoveDialog = ({
  showRemoveDialog,
  handleShowRemoveDialog,
  handleRemoval,
}: RemovalProps) => {
  return (
    <Dialog open={showRemoveDialog} handler={handleShowRemoveDialog}>
      <DialogHeader>Ви впевнені, що хочете видалити відгук?</DialogHeader>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleShowRemoveDialog}
          className="mr-1"
        >
          <span>Відмінити</span>
        </Button>
        <Button className="bg-primary-blue" onClick={handleRemoval}>
          <span>Так, видалити відгук</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};
