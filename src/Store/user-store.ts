import create from "zustand";

export type UserState = {
  userName: string;
  userUniv: string;
  userPw: string;
  setUserName: (by: string) => void;
  setUserUniv: (by: string) => void;
  setUserPw: (by: string) => void;
};

export const useUserStore = create<UserState>((set) => ({
  userName: "",
  userUniv: "",
  userPw: "",
  setUserName: (by) => {
    set((state) => ({ ...state, userName: by }));
  },
  setUserUniv: (by) => {
    set((state) => ({ ...state, userUniv: by }));
  },
  setUserPw: (by) => {
    set((state) => ({ ...state, userPw: by }));
  },
}));
