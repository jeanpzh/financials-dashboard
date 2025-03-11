import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import TransactionForm from "../transactions/components/transaction-form";
import { useModalStore } from "@/lib/store/useModalStore";
import DeleteTransactionForm from "../transactions/components/delete-transaction-form";
import GoalForm from "../goals/components/goal-form";
import DeleteGoalForm from "../goals/components/delete-goal-form";

const actionStrategies = {
  EDIT_TRANSACTION: {
    title: "Editar Transacción",
    description: "Edita los detalles de la transacción",
    component: <TransactionForm type="edit" />,
  },
  CREATE_TRANSACTION: {
    title: "Crear Transacción",
    description: "Añade una nueva transacción con los detalles",
    component: <TransactionForm type="create" />,
  },
  DELETE_TRANSACTION: {
    title: "Eliminar Transacción",
    description: "Estás seguro que deseas eliminar esta transacción?",
    component: <DeleteTransactionForm />,
  },
  CREATE_GOAL: {
    title: "Crear Meta",
    description: "Añade una nueva meta con los detalles",
    component: <GoalForm type="create" />,
  },
  EDIT_GOAL: {
    title: "Editar Meta",
    description: "Edita los detalles de la meta",
    component: <GoalForm type="edit" />,
  },
  DELETE_GOAL: {
    title: "Eliminar Meta",
    description: "Estás seguro que deseas eliminar esta meta?",
    component: <DeleteGoalForm />,
  },
};

export default function RootModal() {
  const { modalType, closeModal, isOpen } = useModalStore();
  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        closeModal();
      }}
    >
      {modalType && actionStrategies[modalType] && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{actionStrategies[modalType].title}</DialogTitle>
            <DialogDescription>
              {actionStrategies[modalType].description}
            </DialogDescription>
          </DialogHeader>
          {actionStrategies[modalType].component}
        </DialogContent>
      )}
    </Dialog>
  );
}
