import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { colors } from "../global/colors";
import SubmitButton from "../components/SubmitButton";
import InputForm from "../components/InputForm";
import { useSignUpMutation } from "../services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "../features/User/UserSlice";
import { getSignupSchema } from "../validations/signupSchema";
import * as yup from 'yup';
import LoginRegisterButton from "../components/LoginRegisterButton";



const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMail, setErrorMail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const [triggerSignUp, result] = useSignUpMutation();

  useEffect(() => {
    if (result.isSuccess) {
      dispatch(
        setUser({
          email: result.data.email,
          idToken: result.data.idToken
        })
      );
    }
  }, [result]);

  const validateField = async (field, value, passwordValue) => {
    try {
      await yup.reach(getSignupSchema(passwordValue), field).validate(value);
      switch (field) {
        case 'email':
          setErrorMail('');
          break;
        case 'password':
          setErrorPassword('');
          break;
        case 'confirmPassword':
          setErrorConfirmPassword('');
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
        case 'confirmPassword':
          setErrorConfirmPassword(err.message);
          break;
        default:
          break;
      }
    }
  };

  const handleChangeEmail = (value) => {
    setEmail(value);
    validateField('email', value, password);
  };

  const handleChangePassword = (value) => {
    setPassword(value);
    validateField('password', value, value);
    validateField('confirmPassword', confirmPassword, value);
  };

  const handleChangeConfirmPassword = (value) => {
    setConfirmPassword(value);
    validateField('confirmPassword', value, password);
    validateField('password', password, value);
  };

  const onSubmit = async () => {
    try {
      await getSignupSchema(password).validate({ email, password, confirmPassword }, { abortEarly: false });
      triggerSignUp({ email, password, returnSecureToken: true });
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors = {};
        err.inner.forEach(error => {
          errors[error.path] = error.message;
        });
        setErrorMail(errors.email || "");
        setErrorPassword(errors.password || "");
        setErrorConfirmPassword(errors.confirmPassword || "");
      }
    }
  };


  return (
    <View style={styles.main}>
      <View style={styles.container}>
        {/* <Text style={styles.title}>Registrarse</Text> */}
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
        <InputForm
          label={"Repite la contraseña"}
          value={confirmPassword}
          onChangeText={handleChangeConfirmPassword}
          error={errorConfirmPassword}
          isSecure={true}
        />
        <LoginRegisterButton
          onPress={onSubmit}
          title="Registrarme"
        />
        {/* <SubmitButton onPress={onSubmit} title="Enviar" /> */}
        <Text style={styles.sub}>¿Ya estás registrado?</Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.subLink}>Inicia sesión aquí</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: colors.gray100,
    gap: 15,
    paddingVertical: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontFamily: "Josefin",  },
  sub: {
    fontSize: 14,
    marginTop: 20,
  },
  subLink: {
    fontSize: 14,
    color: "blue",
  },
});
