import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const RadioButton = ({ onPress, selected, children }) => {
  return (
    <View style={styles.radioButtonContainer}>
      <TouchableOpacity onPress={onPress} style={styles.radioButton}>
        {selected ? <View style={styles.radioButtonIcon} /> : null}
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.radioButtonText}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};

const Radio = () => {
  const [isLiked, setIsLiked] = useState([
    { id: 1, value: "first", name: "S     ", selected: false },
    { id: 2, value: "second", name: "M    ", selected: false },
    { id: 3, value: "third", name: "L", selected: false }
  ]);
  const onRadioBtnClick = (item) => {
    let updatedState = isLiked.map((isLikedItem) =>
      isLikedItem.id === item.id
        ? { ...isLikedItem, selected: true }
        : { ...isLikedItem, selected: false }
    );
    setIsLiked(updatedState);
  };
  return (
    <View style={styles.app}>
      {isLiked.map((item) => (
        <RadioButton
          onPress={() => onRadioBtnClick(item)}
          selected={item.selected}
          key={item.id}
        >
          {item.name}
        </RadioButton>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    marginHorizontal: "auto",
    maxWidth: 500,
    flexDirection:"row",
  },
  radioButtonContainer: {
    flexDirection:"row",
    alignItems: "center",
    marginBottom: 5
  },
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    alignItems: "center",
    justifyContent: "center"
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: "pink"
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 10
  },
  text: {
    lineHeight: 30,
    fontSize: 20,
    marginVertical: 5,
  }
});

export default Radio;
