import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allAssignmentMarksUsers: [],
  allQuizMarkUsers: [],
  ownPosition: {},
};

const leaderBoardSlice = createSlice({
  name: "leaderBoard-slice",
  initialState,
  reducers: {
    allAssignmentCalculate: (state, action) => {
      state.allAssignmentMarksUsers = [...action.payload];
    },
    allQuizCalculate: (state, action) => {
      state.allQuizMarkUsers = [...action.payload];
    },
    saveOwnResult: (state, action) => {
      state.ownPosition = { ...action.payload };
    },
  },
});

export const { allAssignmentCalculate, allQuizCalculate, saveOwnResult } = leaderBoardSlice.actions;
export default leaderBoardSlice.reducer;
