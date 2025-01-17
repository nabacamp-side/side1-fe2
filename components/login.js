import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Vibration,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { theme, backendServer } from "./theme";
import { useEffect, useState } from "react";
import { UserInfo } from "./home/userInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState(false);
  const login = useSelector((state) => state.login);

  const dispatch = useDispatch();

  const loginButton = async () => {
    const user = {
      email: email,
      password: password,
      is_seller: 0,
    };
    try {
      const res = await axios.post(
        `${backendServer.login}`,
        user
      );
      await AsyncStorage.setItem("refresh", res.data.refresh);
      await AsyncStorage.setItem("access", res.data.access);
      const userInfo = await UserInfo();
      dispatch({ type: "SET_USER_INFO", userInfo: userInfo });
      dispatch({
        type: "SET_LOGIN",
        login: true,
      });
      
    } catch (err) {
      setIncorrect(true);
      Vibration.vibrate(Platform.OS === "ios" ? 0 : 1000);
      setTimeout(() => {
        setIncorrect(false);
      }, 1000);
    }
  };

  useEffect(() => {
    login ? navigation.navigate("Home") : null;
  }, [login]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bgColor,
      justifyContent: "center",
    },
    loginImageBox: {
      alignItems: "center",
    },
    styleImage: {
      width: theme.deviceWidth * 0.5,
      height: theme.deviceWidth * 0.5,
      marginBottom: 20,
    },
    loginTitle: {
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
      fontSize: 20,
    },
    loginInputBox: {
      paddingHorizontal: 30,
    },
    loginInput: {
      alignItems: "center",
      backgroundColor: "#fff",
      paddingVertical: 10,
      borderRadius: 25,
      marginBottom: 10,
      paddingHorizontal: 20,
      fontSize: 12,
    },
    loginButton: {
      alignItems: "center",
      backgroundColor: theme.mainColor,
      paddingVertical: 10,
      borderRadius: 25,
      marginBottom: 10,
      marginHorizontal: 30,
    },
    loginJoinTile: {
      textAlign: "center",
      color: "#999",
      fontSize: 12,
    },
    incorrect: {
      width: theme.deviceWidth,
      position: "absolute",
      top: 0,
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      paddingVertical: 10,
      paddingHorizontal: 20,
      justifyContent: "center",
    },
    incorrectText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "200",
      fontStyle: "italic",
      textAlign: "center",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.loginImageBox}>
        <Image
          style={styles.styleImage}
          source={require("../assets/subscribe.png")}
        />
      </View>
      <View style={styles.loginInputBox}>
        <Text style={styles.loginTitle}>회원 로그인</Text>
        <TextInput
          placeholder="아이디 혹은 이메일"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.loginInput}
        />
        <TextInput
          placeholder="비밀번호"
          onSubmitEditing={loginButton}
          returnKeyType="send"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          style={styles.loginInput}
        />
      </View>
      <TouchableOpacity onPress={loginButton} style={styles.loginButton}>
        <Text style={{ color: "#fff" }}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity
        on onPress={() => navigation.replace("JoinPage")}
      >
        <Text style={styles.loginJoinTile}>아직도 회원이 아니신가요? 회원가입</Text>
      </TouchableOpacity>
      {incorrect ? (
        <View style={styles.incorrect}>
          <Text style={styles.incorrectText}>
            아이디 혹은 비밀번호가 맞지 않습니다.
          </Text>
        </View>
      ) : null}
    </View>
  );
}
