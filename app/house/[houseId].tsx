import Button from "@/components/common/Button";
import ScreenHeader from "@/components/common/ScreenHeader";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { HomeRepo } from "@/redux/repository/homeRepository";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import notifee from "@notifee/react-native";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import { distanceBetweenCoords } from "@/src/utils";
import { CONSTANTS } from "@/constants/Constants";

const HouseDetails = () => {
  const { houseId } = useLocalSearchParams();
  const [unlockAvailable, setUnlockAvailable] = useState(false);
  const dispatch = useAppDispatch();
  const { houseById, loading, error } = useAppSelector((state) => state.home);
  const [status, requestPermission] = Location.useForegroundPermissions();

  if (!status?.granted) {
    requestPermission();
  }

  useEffect(() => {
    dispatch(HomeRepo.getHouseById(houseId));
    if (!!houseById) {
      calculateDistance();
    }
  }, []);

  const calculateDistance = async () => {
    let location = await Location.getCurrentPositionAsync({});
    let distance = distanceBetweenCoords({
      lat1: location.coords.latitude,
      lat2: houseById.location.latitude,
      lon1: location.coords.longitude,
      lon2: houseById.location.longitude,
    });
    setUnlockAvailable(distance <= CONSTANTS.DISTANCE_TO_SHOW_UNLOCK);
  };

  const handleUnlockHouse = async () => {
    dispatch(HomeRepo.unlockHouse({ houseId: houseId, successIntended: true }));
  };

  if (loading.houseById) {
    return (
      <ActivityIndicator
        style={styles.loader}
        size={"small"}
        color={Colors.light.brandPurple}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader />
      <ScrollView style={styles.scrollContainer} bounces={false}>
        <View style={styles.houseDetailsContainer}>
          <View style={styles.imageContainer}>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={{ uri: houseById?.imageUrl }}
            />
          </View>
          <View style={styles.titleContainer}>
            <ThemedText type="title">{houseById?.title}</ThemedText>
          </View>
          <View style={styles.descriptionContainer}>
            <ThemedText type="subtitle">Description</ThemedText>
            <ThemedText type="default">{houseById?.description}</ThemedText>
          </View>
          <View style={styles.addressContainer}>
            <ThemedText type="subtitle">Address</ThemedText>
            <ThemedText type="default">{houseById?.address}</ThemedText>
          </View>
        </View>
      </ScrollView>
      {unlockAvailable && (
        <Button title={"Unlock"} onPress={handleUnlockHouse} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  houseDetailsContainer: {},
  scrollContainer: {
    marginBottom: 22,
  },
  image: {
    height: 300,
    width: Dimensions.get("screen").width,
  },
  loader: {
    flex: 1,
  },
  imageContainer: {
    marginBottom: 22,
  },
  titleContainer: {
    paddingHorizontal: 12,
    marginBottom: 22,
  },
  descriptionContainer: {
    paddingHorizontal: 12,
    marginBottom: 22,
  },
  addressContainer: {
    paddingHorizontal: 12,
  },
});

export default HouseDetails;
