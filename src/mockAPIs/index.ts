import { dummyHouseData } from "@/constants/DummyData";

export const getHousesDummyAPI = async () => {
  const houses = new Promise((res, rej) => {
    setTimeout(() => {
      res({ data: dummyHouseData, status: 200 });
    }, 3000);
  });
  return houses;
};

export const getHouseByIdDummyAPI = async (houseId: string | string[]) => {
  let house = await new Promise((res, rej) => {
    setTimeout(() => {
      const house = dummyHouseData.find((house) => house.id === houseId);
      res({ data: house, status: 200 });
    }, 1000);
  });
  return house;
};

export const unlockHouse = async (
  houseId: string | string[],
  successIntended: boolean
) => {
  let message = await new Promise((res, rej) => {
    setTimeout(() => {
      if (successIntended) {
        res({
          data: {
            message: `Congratulations! House with id ${houseId} is unlocked.`,
          },
          status: 200,
        });
      } else {
        res({
          data: { message: "Something went wrong, try again." },
          status: 500,
        });
      }
      return message;
    }, 2000);
  });
  return message;
};
