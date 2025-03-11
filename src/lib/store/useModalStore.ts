import { create } from "zustand";
import { Transaction } from "../types/transaction";
import { Goal } from "../types/goal";

type ModalType =
  | "CREATE_TRANSACTION"
  | "EDIT_TRANSACTION"
  | "DELETE_TRANSACTION"
  | "CREATE_GOAL"
  | "EDIT_GOAL"
  | "DELETE_GOAL";


interface ModalState {
  item: Transaction | Goal | null;
  isOpen: boolean;
  modalType: ModalType | null;
  openModal: (modalType: ModalType, item?: Transaction | Goal) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  modalType: null,
  openModal: (modalType: ModalType, item?: Transaction | Goal ) =>
    set({ isOpen: true, modalType, item }),
  closeModal: () => set({ isOpen: false, modalType: null, item: null }),
  item: null,
}));
