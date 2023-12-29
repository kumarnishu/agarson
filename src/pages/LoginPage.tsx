import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext';
import { Formik } from 'formik'
import * as yup from "yup";
import { Login } from '../services/UserServices';
import { Alert, Image, ScrollView, View } from 'react-native';
import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import { IUser } from '../types/user.types';
import { BackendError } from '../types/error.types';
import { Button, Input, Icon } from '@rneui/themed';
import { REACT_APP_API_URL } from "@env"
import { Text } from '@rneui/base';

const LoginFormSchema = yup.object({
  username: yup.string().required("required field"),
  password: yup.string().required('required field')
})

const LoginScreen = () => {
  const [display, setDisplay] = useState(false)
  const { setUser } = useContext(UserContext)
  const { mutate, data, isSuccess, isLoading, error } = useMutation
    <AxiosResponse<{ user: IUser, token: string }>,
      BackendError,
      { username: string, password: string, multi_login_token?: string }
    >(Login)



  useEffect(() => {
    if (isSuccess) {
      setUser(data.data.user)
    }
  }, [isSuccess])
  return (
    <>
      <Text>{REACT_APP_API_URL}</Text>
      {error && Alert.alert(error.response.data.message) || ""}
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginFormSchema}
        onSubmit={async (values) => {
          mutate({
            ...values,
            multi_login_token: "akknahkh"
          })
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
           
            <ScrollView contentContainerStyle={{ flex: 1, marginTop: 100, justifyContent: 'center', padding: 10 }}>
              <View style={{ flex: 1, gap: 1 }}>
                <View style={{ alignItems: 'center' }}>
                  <Image style={{ height: 200, width: 200 }} source={require("../assets/logo.png")} />
                </View>

                <Input
                  style={{ borderRadius: 10, padding: 10, fontSize: 20 }}
                  placeholder="Username,email or mobile"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  autoCapitalize='none'
                  value={values.username}
                />
                <Input
                  style={{ borderRadius: 10, padding: 10, fontSize: 20 }}
                  rightIcon={
                    display ? <Icon
                      name='eye'
                      type='font-awesome'
                      onPress={() => setDisplay(false)} /> : <Icon
                      name='eye-slash'
                      type='font-awesome'
                      onPress={() => setDisplay(true)} />}
                  placeholder='Password'
                  autoCorrect={false}
                  autoCapitalize='none'
                  secureTextEntry={!display}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />

                <Button
                  size="lg"
                  title="Login"
                  disabled={isLoading}
                  onPress={() => handleSubmit()}>
                </Button>
              </View>
            </ScrollView>
          </>
        )}
      </Formik >
    </>
  )
}



export default LoginScreen