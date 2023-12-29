import React, { useContext, useEffect, useState } from 'react'
import { Alert, ScrollView, View } from 'react-native';
import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import { IVisit } from '../../types/visit.types';
import { MakeVisitIn } from '../../services/VisitServices';
import { ChoiceContext, VisitChoiceActions } from '../../contexts/ModalContext';
import { BackendError } from '../../types/error.types';
import { LocationContext } from '../../contexts/LocationContext';
import { PhotoFile } from 'react-native-vision-camera';
import { queryClient } from '../../../App';
import { Button, Switch, Text } from '@rneui/base';
import { Input } from '@rneui/themed';
import CameraComponent from '../CameraComponent';

const NewVisitForm = ({ visit }: { visit: IVisit }) => {
    const { location } = useContext(LocationContext)
    const [isOld, setIsOld] = React.useState(false);
    const [party, setParty] = React.useState("");
    const [mobile, setMobile] = React.useState("");
    const [city, setCity] = React.useState("");
    const [display, setDisplay] = useState(true)
    const [photo, setPhoto] = useState<PhotoFile>()
    const { setChoice } = useContext(ChoiceContext)
    const { mutate, isLoading, isSuccess, error } = useMutation
        <AxiosResponse<IVisit>, BackendError, { id: string, body: FormData }>
        (MakeVisitIn, {
            onSuccess: () => {
                queryClient.invalidateQueries('visit')
            }
        })

    useEffect(() => {
        if (isSuccess) {
            setChoice({ type: VisitChoiceActions.close_visit })
        }
    }, [isSuccess])

    function handleValidation() {
        if (party && city) {
            setDisplay(false)
        }
    }

    function handleSubmit() {
        async function submit() {
            if (location && photo) {
                let formdata = new FormData()
                let Data = {
                    visit_in_credientials: {
                        latitude: location?.coords.latitude,
                        longitude: location?.coords.longitude,
                        timestamp: new Date(location?.timestamp)
                    },
                    party_name: party,
                    city: city,
                    mobile:mobile,
                    is_old_party: isOld
                }

                formdata.append("body", JSON.stringify(Data))
                //@ts-ignore
                formdata.append('media', {
                    uri: `file://${photo.path}`,
                    name: 'photo' + new Date().toDateString() + ".jpg",
                    type: 'image/jpeg'
                })
                console.log(formdata)
                mutate({
                    id: visit._id,
                    body: formdata
                })
            }
        }
        submit()
    }

    return (
        <>
            {display ? <ScrollView contentContainerStyle={{ paddingTop: 60, justifyContent: 'center', padding: 10 }}>


                <View style={{ flex: 1, gap: 15 }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>NEW VISIT FORM</Text>
                    <Input
                        style={{ borderRadius: 10, borderWidth: 2, padding: 5, fontSize: 20 }}
                        
                        label="Party name"
                        value={party}
                        onChangeText={(value) => setParty(value)}
                    />
                    <Input
                        style={{ borderRadius: 10, borderWidth: 2, padding: 5, fontSize: 20 }}
                        label="Mobile"
                        value={mobile}
                        onChangeText={(value) => setMobile(value)}
                    />
                    <Input
                        style={{ borderRadius: 10, borderWidth: 2, padding: 5, fontSize: 20 }}
                        
                        label="City"
                        value={city}
                        onChangeText={(value) => setCity(value)}

                    />
                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>IS OLD PARTY ?</Text>
                        <Switch
                            value={isOld} onValueChange={() => setIsOld(!isOld)}
                        />
                    </View>
                    {!isLoading ? <Button
                        type="solid"
                        disabled={isLoading}
                        style={{ padding: 10, borderRadius: 10 }}
                        onPress={handleValidation} >
                        <Text style={{ color: 'white', fontSize: 20 }}>Done</Text>
                    </Button> : null}
                </View>
            </ScrollView > : null}
            {!display && location && <CameraComponent photo={photo} setPhoto={setPhoto} isLoading={isLoading} handlePress={handleSubmit} />}
        </>
    )
}



export default NewVisitForm