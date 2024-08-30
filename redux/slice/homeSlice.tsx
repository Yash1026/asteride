import { createSlice } from "@reduxjs/toolkit";
import { HomeRepo } from "../repository/homeRepository";

interface HomeLoading {
  getHouses: boolean;
  houseById: boolean;
  unlockHouse: boolean;
}

interface HomeError {
  getHouses: any;
  houseById: any;
  unlockHouse: any;
}

interface HomeState {
  houses: any;
  houseById: any;
  unlockHouseMessage: any;
  loading: HomeLoading;
  error: HomeError;
}

const initialState: HomeState = {
  houses: [],
  houseById: null,
  unlockHouseMessage: null,
  loading: {
    getHouses: false,
    houseById: false,
    unlockHouse: false,
  },
  error: {
    getHouses: null,
    houseById: null,
    unlockHouse: null,
  },
};

export const HomeSlice = createSlice({
  name: "home",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //getHouses
    builder.addCase(HomeRepo.getHouses.pending, (state, action) => {
      state.loading.getHouses = true;
      state.error.getHouses = null;
    });
    builder.addCase(HomeRepo.getHouses.fulfilled, (state, action) => {
      state.loading.getHouses = false;
      state.houses = action.payload;
    });
    builder.addCase(HomeRepo.getHouses.rejected, (state, action) => {
      state.loading.getHouses = false;
      state.error.getHouses = true;
    });

    //getHouseById
    builder.addCase(HomeRepo.getHouseById.pending, (state, action) => {
      state.loading.houseById = true;
      state.error.houseById = null;
    });
    builder.addCase(HomeRepo.getHouseById.fulfilled, (state, action) => {
      state.loading.houseById = false;
      state.houseById = action.payload;
    });
    builder.addCase(HomeRepo.getHouseById.rejected, (state, action) => {
      state.loading.houseById = false;
      state.error.houseById = true;
    });

    //unlockHouse
    builder.addCase(HomeRepo.unlockHouse.pending, (state, action) => {
      state.loading.unlockHouse = true;
      state.error.unlockHouse = null;
    });
    builder.addCase(HomeRepo.unlockHouse.fulfilled, (state, action) => {
      state.loading.unlockHouse = false;
      state.unlockHouseMessage = action.payload;
    });
    builder.addCase(HomeRepo.unlockHouse.rejected, (state, action) => {
      state.loading.unlockHouse = false;
      state.error.unlockHouse = true;
    });
  },
});

export default HomeSlice.reducer;
