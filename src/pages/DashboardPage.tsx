import { View } from 'react-native'
import React, { useContext } from 'react'
import { Button } from '@rneui/base'
import { UserContext } from '../contexts/UserContext'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PrivateParamList } from '../../Navigation';

type Props = NativeStackScreenProps<
  PrivateParamList,
  'Dashboard'
>;

const DashboardPage = ({ navigation }: Props) => {
  const { setUser } = useContext(UserContext)
  return (
    <View style={{ padding: 10, gap: 10 }}>
      <Button onPress={() => {
        navigation.navigate("Visit")
      }}>
        Visit Page
      </Button>
      <Button onPress={() => {
        setUser(undefined)
      }}>
        Login Page
      </Button>
    </View>
  )
}

export default DashboardPage