import { Colors } from "@/constants/Colors";
import React from "react";
import {
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  Text,
  StyleSheet,
} from "react-native";

interface Props {
  title: string;
  titleStyle?: TextStyle;
  containerStyle?: ViewStyle;
  onPress: () => void;
}

const Button = (props: Props) => {
  const { title, titleStyle, containerStyle, onPress } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, containerStyle]}
    >
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.brandPurple,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 12,
  },
  title: {
    color: Colors.light.white,
    textAlign: "center",
    fontSize: 24,
  },
});

export default Button;
