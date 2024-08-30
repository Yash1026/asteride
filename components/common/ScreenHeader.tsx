import React from "react";
import {
  TouchableOpacity,
  View,
  ViewStyle,
  StyleSheet,
  Text,
} from "react-native";
import { ThemedText } from "../ThemedText";
import { router, useNavigation } from "expo-router";

interface Props {
  headerText?: string;
  containerStyle?: ViewStyle;
  handleBack?: () => void;
}

const ScreenHeader = (props: Props) => {
  const navigation = useNavigation();
  const {
    headerText,
    containerStyle,
    handleBack = () => {
      navigation.goBack();
    },
  } = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={handleBack} style={{ padding: 4 }}>
          <Text style={styles.backIcon}>{`Back`}</Text>
        </TouchableOpacity>
        <ThemedText>{headerText}</ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  titleContainer: {},
  backIcon: {
    fontSize: 12,
    paddingHorizontal: 12,
  },
});

export default ScreenHeader;
