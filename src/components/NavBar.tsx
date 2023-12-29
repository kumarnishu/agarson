import { View, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext';
import { ChoiceContext, NavChoiceActions } from '../contexts/ModalContext';
import { Avatar } from '@rneui/themed';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import SideNavBarDialog from './dialogs/SideNavBarDialog';

function NavBar() {
    const { navigate } = useNavigation<any>()
    const { user } = useContext(UserContext)
    const { setChoice } = useContext(ChoiceContext)

    return (
        <>
            <View style={{ backgroundColor: 'red' }}>
                <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Avatar
                        size={30}
                        rounded
                        source={{ uri: user?.dp?.public_url || "https://www.bo.agarson.in/logo.png" }}
                        onPress={() => navigate("Dashboard")}
                    />

                    <TouchableOpacity>
                        <Icon
                            name="bars"
                            color="white"
                            type='font-awesome'
                            onPress={() => setChoice({ type: NavChoiceActions.view_home_sidebar })} />

                    </TouchableOpacity>
                </View>
            </View >
            <SideNavBarDialog />
        </>
    )
}

export default NavBar