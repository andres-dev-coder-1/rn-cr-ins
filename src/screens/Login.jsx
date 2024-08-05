import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { colors } from "../global/colors";

import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";
import { useSignInMutation } from "../services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "../features/User/UserSlice";
import { getLoginSchema } from "../validations/loginSchema";
import * as yup from 'yup';

import { insertSession } from "../persistence";
import LoginRegisterButton from "../components/LoginRegisterButton";


const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMail, setErrorMail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const dispatch = useDispatch();

  const [triggerSignIn, result] = useSignInMutation();

  useEffect(() => {
    if (result?.data && result.isSuccess) {
      insertSession({
        email: result.data.email,
        localId: result.data.localId,
        token: result.data.idToken
      }).then((response) => {
        // console.log(response);
        dispatch(
          setUser({
            email: result.data.email,
            idToken: result.data.idToken,
            localId: result.data.localId,
          })
        );
      }).catch(err => {
        // console.error(err);
      });
    }
  }, [result]);

  const validateField = async (field, value) => {
    try {
      await yup.reach(getLoginSchema, field).validate(value);
      switch (field) {
        case 'email':
          setErrorMail('');
          break;
        case 'password':
          setErrorPassword('');
          break;
        default:
          break;
      }
    } catch (err) {
      switch (field) {
        case 'email':
          setErrorMail(err.message);
          break;
        case 'password':
          setErrorPassword(err.message);
          break;
        default:
          break;
      }
    }
  };

  const handleChangeEmail = (value) => {
    setEmail(value);
    validateField('email', value);
  };

  const handleChangePassword = (value) => {
    setPassword(value);
    validateField('password', value);
  };

  const onSubmit = async () => {
    try {
      await getLoginSchema.validate({ email, password }, { abortEarly: false });
      triggerSignIn({ email, password, returnSecureToken: true });
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors = {};
        err.inner.forEach(error => {
          errors[error.path] = error.message;
        });
        setErrorMail(errors.email || "");
        setErrorPassword(errors.password || "");
      }
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        {/* <Text style={styles.title}>Iniciar sesión</Text> */}
        <InputForm
          label={"E-mail"}
          value={email}
          onChangeText={handleChangeEmail}
          error={errorMail}
        />
        <InputForm
          label={"Contraseña"}
          value={password}
          onChangeText={handleChangePassword}
          error={errorPassword}
          isSecure={true}
        />
        <LoginRegisterButton
          onPress={onSubmit} title="Iniciar sesión"
        />
        {/* <SubmitButton onPress={onSubmit} title="Send" /> */}
        <Text style={styles.sub}>¿No tienes una cuenta?</Text>

        <Pressable onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.subLink}>Registrarse</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: colors.white,
  },
  container: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: colors.blue200,
    gap: 15,
    paddingVertical: 20,
    border: 1,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontFamily: "Josefin",
  },
  sub: {
    fontSize: 14,
    marginTop: 20,
    // color: colors.blue100,
  },
  subLink: {
    fontSize: 14,
    color: "blue",
  },
});
