import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";

export default function HomeBottom( { navigation } ) {
  const bottomMenuList = useSelector((state) => state.bottomMenuList);

  const styles = StyleSheet.create({
    bottomMenu: {
      position: "absolute",
      bottom: 0,
      left: 0,
      backgroundColor: "#fff",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      borderTopWidth: 1,
      borderTopColor: "#eee",
      paddingVertical: 10,
    },
    bottomMenuItem: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    bottomMenuText: {
      fontSize: 10,
      marginTop: 5,
    },
  });

  return (
    <View style={{ marginTop: 80 }}>
      <View style={styles.bottomMenu}>
        {bottomMenuList.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.bottomMenuItem}
              onPress={() => {
                navigation.navigate(item.menu);
              }}
            >
              <FontAwesome5 name={item.icon} size={20} />
              <Text style={styles.bottomMenuText}>{item.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
