import {
  getHouseByIdDummyAPI,
  getHousesDummyAPI,
  unlockHouse,
} from "@/src/mockAPIs";
import { displayNotification } from "@/src/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";

class HomeRepository {
  getHouses = createAsyncThunk("home/getHouses", async () => {
    let response: any = await getHousesDummyAPI();
    return response.data;
  });

  getHouseById = createAsyncThunk(
    "home/getHouseById",
    async (houseId: string | string[]) => {
      let response: any = await getHouseByIdDummyAPI(houseId);
      return response.data;
    }
  );
  unlockHouse = createAsyncThunk(
    "home/unlockHouse",
    async ({
      houseId,
      successIntended,
    }: {
      houseId: string | string[];
      successIntended: boolean;
    }) => {
      let response: any = await unlockHouse(houseId, successIntended);
      Toast.show({
        type: response.status == 200 ? "success" : "error",
        text1: response.data.message,
      });
      if (response.status == 200) {
        displayNotification(response.data.message);
      }
      return response;
    }
  );
}

const homeRepo = new HomeRepository();

export { homeRepo as HomeRepo };
