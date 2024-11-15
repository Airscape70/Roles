import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface IStore {}

export const useStore = create<IStore>()(immer(( set ) => ({ 
  
})));
