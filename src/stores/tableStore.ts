import { create } from 'zustand';
import { Doc } from 'yjs';

interface TableState {
  selectedRows: string[];
  doc: Doc | null;
  setSelectedRows: (rows: string[]) => void;
  setDoc: (doc: Doc) => void;
}

export const useTableStore = create<TableState>((set) => ({
  selectedRows: [],
  doc: null,
  setSelectedRows: (rows) => set({ selectedRows: rows }),
  setDoc: (doc) => set({ doc }),
}));