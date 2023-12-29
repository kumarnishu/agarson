import React, { useContext, useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from "yup";
import { ActivityIndicator, Alert, ScrollView, View } from 'react-native';
import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import { IVisitReport } from '../../types/visit.types';
import { ChoiceContext, VisitChoiceActions } from '../../contexts/ModalContext';
import { BackendError } from '../../types/error.types';
import { AddVisitSummary } from '../../services/VisitServices';
import { queryClient } from '../../../App';
import { Button, Input, Switch, Text } from '@rneui/base';


const Schema = Yup.object({
    summary: Yup.string().required("required"),
    mobile: Yup.string().required("required mobile string")
        .min(10, 'Must be 10 digits')
        .max(10, 'Must be 10 digits'),
    is_old_party: Yup.boolean().required("required"),
    dealer_of: Yup.string().required("required"),
    refs_given: Yup.string().required("required"),
    reviews_taken: Yup.number().required("required"),
    turnover: Yup.string().required("required")
})

const AddSummaryForm = ({ visit }: { visit: IVisitReport }) => {
    const [isOld, setIsOld] = React.useState(false);
    const { setChoice } = useContext(ChoiceContext)
    const { mutate, isLoading, isSuccess, error } = useMutation
        <AxiosResponse<any>, BackendError, {
            id: string;
            body: {
                mobile: string,
                summary: string;
                is_old_party: boolean;
                dealer_of: string;
                refs_given: string;
                reviews_taken: number;
                turnover: string
            }
        }>
        (AddVisitSummary, {
            onSuccess: () => {
                queryClient.invalidateQueries('visit')
            }
        })

    useEffect(() => {
        if (isSuccess) {
            setChoice({ type: VisitChoiceActions.close_visit })
        }
    }, [isSuccess])


    return (
        <>
            {error && Alert.alert(error.response.data.message) || ""}
            <Formik
                initialValues={{
                    summary: "NA",
                    mobile: visit.mobile || "",
                    is_old_party: isOld,
                    dealer_of: "NA",
                    refs_given: "NA",
                    turnover: "NA",
                    reviews_taken: 0
                }}
                validationSchema={Schema}
                onSubmit={async (values) => {
                    let Data = {
                        summary: values.summary,
                        mobile: values.mobile,
                        is_old_party: isOld,
                        dealer_of: values.dealer_of,
                        refs_given: values.refs_given,
                        reviews_taken: values.reviews_taken,
                        turnover: values.turnover,
                    }

                    mutate({ id: visit._id, body: Data })
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <>
                        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', padding: 10 }}>


                            <View style={{ flex: 1, gap: 15 }}>
                                <Input

                                    style={{ borderRadius: 10, borderWidth: 2, padding: 5, fontSize: 16 }}
                                    label="Mobile"
                                    onChangeText={handleChange('mobile')}
                                    onBlur={handleBlur('mobile')}
                                    autoCapitalize='none'
                                    value={values.mobile}
                                />

                                <Input

                                    style={{ borderRadius: 10, borderWidth: 2, padding: 5, fontSize: 16 }}
                                    label="Dealer Of"
                                    onChangeText={handleChange('dealer_of')}
                                    onBlur={handleBlur('dealer_of')}
                                    autoCapitalize='none'
                                    value={values.dealer_of}
                                />

                                <Input

                                    style={{ borderRadius: 10, borderWidth: 2, padding: 5, fontSize: 16 }}
                                    label="Turn Over"
                                    onChangeText={handleChange('turnover')}
                                    onBlur={handleBlur('turnover')}
                                    autoCapitalize='none'
                                    value={values.turnover}
                                />

                                <Input

                                    style={{ borderRadius: 10, borderWidth: 2, padding: 5, fontSize: 16 }}
                                    label="Refs Given"
                                    onChangeText={handleChange('refs_given')}
                                    onBlur={handleBlur('refs_given')}
                                    autoCapitalize='none'
                                    value={values.refs_given}
                                />
                                <Input

                                    keyboardType='numeric'
                                    style={{ borderRadius: 10, borderWidth: 2, padding: 5, fontSize: 16 }}
                                    label="Google Review Taken"
                                    onChangeText={handleChange('reviews_taken')}
                                    onBlur={handleBlur('reviews_taken')}
                                    autoCapitalize='none'
                                    maxLength={10}
                                    value={String(values.reviews_taken)}
                                />
                                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                    <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>IS OLD PARTY ?</Text>
                                    <Switch
                                        value={isOld} onValueChange={() => setIsOld(!isOld)}
                                    />
                                </View>

                                <Input

                                    multiline
                                    style={{ borderRadius: 10, borderWidth: 2, padding: 5, fontSize: 16 }}

                                    label="Summary"
                                    onChangeText={handleChange('summary')}
                                    onBlur={handleBlur('summary')}
                                    autoCapitalize='none'
                                    value={values.summary}
                                />
                                {isLoading && <ActivityIndicator size={'large'} animating={true} color={'red'} />}
                                {!isLoading && <Button
                                    type="solid"
                                    disabled={isLoading}
                                    style={{ padding: 10, borderRadius: 10 }}
                                    onPress={() => handleSubmit()}>
                                    <Text style={{ color: 'white', fontSize: 16 }}>Submit</Text>
                                </Button>}
                            </View>
                        </ScrollView>
                    </>
                )}
            </Formik >
        </>
    )
}



export default AddSummaryForm