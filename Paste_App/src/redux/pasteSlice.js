import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addPastes: (state, action) => {
      const paste = action.payload; // FIXED
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste created successfully");
    },

    updatePastes: (state, action) => {
      const paste = action.payload; // FIXED
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste updated successfully");
      }
    },

    removePastes: (state, action) => {
      const pasteId = action.payload; // FIXED
      const index = state.pastes.findIndex((item) => item._id === pasteId);

      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste deleted successfully");
      }
    },

    resetPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast("All pastes cleared");
    },
  },
});

export const { addPastes, updatePastes, resetPastes, removePastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
