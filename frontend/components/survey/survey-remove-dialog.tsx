import {
  Dialog,
  DialogHeader,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import React from "react";

interface SurveyRemoveDialog {
  showRemoveDialog: boolean;
  handleShowRemoveDialog: () => void;
  handleRemoval: () => void;
}

export const SurveyRemoveDialog = ({
  showRemoveDialog,
  handleShowRemoveDialog,
  handleRemoval,
}: SurveyRemoveDialog) => {
  return (
    <Dialog open={showRemoveDialog} handler={handleShowRemoveDialog}>
      <DialogHeader>Ви впевнені, що хочете видалити опитування?</DialogHeader>
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
          <span>Так, видалити опитування</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};
