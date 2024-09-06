import React from "react";
import { TextButton } from "../../ui";
import { useDialog } from "../../ui/Dialog";
import { BusynessList } from "./components/BusynessList";


export const BusynessListContainer = () => {
  const [Dialog, openDialog, closeDialog] = useDialog();

  return (
    <>
      <TextButton
        buttonType="primary"
        text="忙しさリスト"
        onClick={openDialog}
      />
      <Dialog>
        <BusynessList
          // users={otherUsers}
          onClose={closeDialog}
        />
      </Dialog>
    </>
  );
};

