import React, { useContext, useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { ChoiceContext, NavChoiceActions } from '../../contexts/ModalContext';
import { Logout } from '../../services/UserServices';
import { UserContext } from '../../contexts/UserContext';
import { BackendError } from '../../types/error.types';
import Drawer from '../styled/DrawerComponent';

const SideNavBarDialog = () => {
    const { setUser } = useContext(UserContext)
    const [error, setError] = useState<BackendError>()
    const { choice, setChoice } = useContext(ChoiceContext)
    if (error)
        Alert.alert(error.response.data.message)
    return (
        <Drawer visible={choice === NavChoiceActions.view_home_sidebar} handleClose={() => setChoice({ type: NavChoiceActions.close_nav })} position='right'>
            <View style={{ flex: 1, width: '100%', justifyContent: 'space-between', backgroundColor: 'red', paddingTop: 20 }}>
                <View style={{ flexDirection: 'column', gap: 10, width: '100%' }}>
                    <Pressable style={{ flexDirection: 'row', gap: 5, alignItems: 'center', padding: 10 }} onPress={() => {
                        setChoice({ type: NavChoiceActions.close_nav })
                    }}>

                        <Text style={{ color: "white", fontSize: 20 }}> My Visit</Text>
                    </Pressable>

                    <Pressable style={{ flexDirection: 'row', gap: 5, alignItems: 'center', padding: 10 }} onPress={() => {
                        setChoice({ type: NavChoiceActions.close_nav })
                    }}>
                        <Text style={{ color: "white", fontSize: 20 }}> LEADS</Text>
                    </Pressable>
                </View>

                <View style={{ padding: 20 }}>
                    <Pressable style={{ flexDirection: 'row', gap: 5, alignItems: 'center', padding: 10 }} onPress={async () => {
                        setChoice({ type: NavChoiceActions.close_nav })
                        await Logout().then(() => {
                            setUser(undefined)
                        }).catch((err) => setError(err))

                    }}>

                        <Text style={{ color: "white", fontSize: 20 }}>Logout</Text>
                    </Pressable>
                </View>
            </View>
        </Drawer>
    );
};



export default SideNavBarDialog;