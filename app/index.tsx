import Card from "@/components/home/Card";
import { Colors } from "@/constants/Colors";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { House } from "@/models/home";
import { HomeRepo } from "@/redux/repository/homeRepository";
import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from "react-native";

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const { houses, loading, error } = useAppSelector((state) => state.home);

  useEffect(() => {
    dispatch(HomeRepo.getHouses());
  }, []);

  if (loading.getHouses) {
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
      <FlatList
        data={houses}
        renderItem={({ item }: { item: House }) => <Card house={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.white,
  },
  flatListContainer: {
    backgroundColor: Colors.light.white,
    alignItems: "center",
  },
  loader: {
    flex: 1,
  },
});
