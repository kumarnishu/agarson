import { useContext, useEffect, useState } from 'react';
import { Alert, Text } from 'react-native';
import { StartMyDay } from '../../services/VisitServices';
import { ChoiceContext, VisitChoiceActions } from '../../contexts/ModalContext';
import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import { IVisit } from '../../types/visit.types';
import { BackendError } from '../../types/error.types';
import { LocationContext } from '../../contexts/LocationContext';
import { PhotoFile } from 'react-native-vision-camera';
import { queryClient } from '../../../App';
import CameraComponent from '../CameraComponent';

function StartMydayForm() {
    const { location } = useContext(LocationContext)
    const [photo, setPhoto] = useState<PhotoFile>()
    const { mutate, isLoading, isSuccess, error } = useMutation
        <AxiosResponse<IVisit>, BackendError, FormData>
        (StartMyDay, {
            onSuccess: () => {
                queryClient.invalidateQueries('visit')
            }
        })
    const { setChoice } = useContext(ChoiceContext)

    function handlePress() {
        async function submit() {
            if (location && photo) {
                let formdata = new FormData()
                formdata.append("body", JSON.stringify({
                    start_day_credientials: {
                        latitude: location?.coords.latitude,
                        longitude: location?.coords.longitude,
                        timestamp: new Date(location?.timestamp)
                    }
                }))
                //@ts-ignore
                formdata.append('media', {
                    uri: `file://${photo.path}`,
                    name: 'photo' + new Date().toDateString() + ".jpg",
                    type: 'image/jpeg'
                })
                mutate(formdata)
            }
        }
        submit()
    }

    useEffect(() => {
        if (isSuccess) {
            setChoice({ type: VisitChoiceActions.close_visit })
        }
    }, [isSuccess])
    return (
        <>
            {error && Alert.alert(error.response.data.message)}
            {!location && <Text style={{ color: 'red' }}>Please Allow Location Access</Text>}
            {location && <CameraComponent photo={photo} setPhoto={setPhoto} isLoading={isLoading} handlePress={handlePress} />}
        </>
    )
}


export default StartMydayForm
