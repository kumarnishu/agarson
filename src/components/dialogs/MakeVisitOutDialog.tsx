import { useContext } from 'react';
import { ChoiceContext, VisitChoiceActions } from '../../contexts/ModalContext';
import { IVisitReport } from '../../types/visit.types';
import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import { MakeVisitOut } from '../../services/VisitServices';
import { ActivityIndicator, View } from 'react-native';
import { BackendError } from '../../types/error.types';
import { LocationContext } from '../../contexts/LocationContext';
import { queryClient } from '../../../App';
import Dialog from '../styled/DialogComponent';
import { Button, Text } from '@rneui/base';

function MakeVisitOutDialog({ visit }: { visit: IVisitReport }) {
    const { location } = useContext(LocationContext)
    const { choice, setChoice } = useContext(ChoiceContext)
    const { mutate, isLoading } = useMutation
        <AxiosResponse<any>, BackendError, {
            id: string;
            body: FormData;
        }>
        (MakeVisitOut, {
            onSuccess: () => {
                queryClient.invalidateQueries('visit')
                setChoice({ type: VisitChoiceActions.close_visit })
            }
        })

    function handleSubmit() {
        async function submit() {
            if (location) {
                let formdata = new FormData()
                let Data = {
                    visit_out_credentials: {
                        latitude: location?.coords.latitude,
                        longitude: location?.coords.longitude,
                        timestamp: new Date(location?.timestamp)
                    }
                }

                formdata.append("body", JSON.stringify(Data))
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
            <Dialog fullScreen visible={choice === VisitChoiceActions.visit_out ? true : false} handleClose={() => setChoice({ type: VisitChoiceActions.close_visit })}
            >
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', gap: 50, alignItems: 'center', marginTop: 200, padding: 10 }}>

                    <Text style={{ fontWeight: 'bold', fontSize: 25 }}>{visit.party_name}</Text>
                    < Button
                        type='outline'
                        disabled={isLoading}
                        style={{ width: '100%' }}
                        onPress={
                            () => {
                                handleSubmit()
                                setChoice({ type: VisitChoiceActions.visit_out })
                            }
                        }
                    >
                        {isLoading ? <ActivityIndicator size="large" /> :
                            <Text style={{ padding: 10, fontSize: 20, fontWeight: 'bold' }}> VISIT OUT</Text>}
                    </Button>
                </View >
            </Dialog>
        </>
    )
}

export default MakeVisitOutDialog


