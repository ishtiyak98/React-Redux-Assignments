import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedAnswers: [],
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    getSelectedAnswers: (state, action) => {
      if (action.payload.checked) {
        if (!state.selectedAnswers.includes(action.payload.id)) {
          state.selectedAnswers = [...state.selectedAnswers, action.payload.id];
        }
      } else if (!action.payload.checked) {
        if (state.selectedAnswers.includes(action.payload.id)) {
          state.selectedAnswers = [
            ...state.selectedAnswers.filter(
              (item) => item !== action.payload.id
            ),
          ];
        }
      }
    },
    removeSelectedAnswers: (state) => {
      state.selectedAnswers = [];
    },
  },
});

export const { getSelectedAnswers, removeSelectedAnswers } = quizSlice.actions;
export default quizSlice.reducer;
