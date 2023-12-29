import { Icon } from '@rneui/base';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { Camera, CameraPosition, PhotoFile, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';

type Props = {
    isLoading: boolean,
    handlePress: () => void,
    photo: PhotoFile | undefined,
    setPhoto: React.Dispatch<React.SetStateAction<PhotoFile | undefined>>
}
function CameraComponent({ isLoading, handlePress, photo, setPhoto }: Props) {
    const [type, setType] = useState<CameraPosition>('front');
    const { hasPermission, requestPermission } = useCameraPermission()
    const cameraRef = useRef<Camera | null>(null)
    const device = useCameraDevice(type)

    async function onClickPicure() {
        if (cameraRef && cameraRef.current) {
            const photo = await cameraRef.current.takePhoto({
                qualityPrioritization: 'quality',
            });
            if (photo) {
                setPhoto(photo)
            }
        }
    }

    useEffect(() => {
        async function requestCamera() {
            await requestPermission()
        }
        if (device && !hasPermission) {
            requestCamera()
        }

    }, [hasPermission, device])

    return (
        <>

            {!hasPermission && <Text style={{ color: 'red' }}>Please Allow camera Access</Text>}
            {photo ?
                <View style={{ flex: 1 }}>
                    <Image
                        style={{ width: '100%', minHeight: 700 }}
                        source={{
                            uri: `file://${photo.path}`
                        }} />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: 10,
                        padding: 10,
                        width: '100%'
                    }}>
                        {isLoading && <ActivityIndicator size="large" />}
                        <Icon
                            color={'blue'}
                            name='save'
                            type='font-awesome'
                            reverse
                            disabled={isLoading}
                            onPress={handlePress} />
                        <Icon
                            color="grey"
                            name='window-restore'
                            reverse
                            disabled={isLoading}
                            type='font-awesome'
                            onPress={() => {
                                setPhoto(undefined)
                            }} />

                    </View>
                </View >
                :
                <View style={{ flex: 1 }}>
                    {device ? <Camera
                        ref={cameraRef}
                        photo={true}
                        style={{ width: '100%', minHeight: 700 }}
                        device={device}
                        isActive={true}
                        audio={false}
                    /> : null}
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: 10,
                        padding: 10,
                        width: '100%'
                    }}>
                        <Icon
                            style={{ color: 'white' }}
                            name='window-restore'
                            disabled={isLoading}
                            reverse
                            type='font-awesome'
                            onPress={() => {
                                setType(current => (current === "front" ? "back" : 'front'));
                            }} />
                        <Icon
                            style={{ color: 'white' }}
                            name='camera'
                            reverse
                            disabled={isLoading}
                            type='font-awesome'
                            onPress={() => {
                                onClickPicure()
                            }} />
                    </View>
                </View>
            }
        </>
    )
}


export default CameraComponent