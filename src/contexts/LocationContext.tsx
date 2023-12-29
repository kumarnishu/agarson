import React, { createContext, useEffect, useState } from "react";
import { PermissionsAndroid } from "react-native"
import Geolocation from 'react-native-geolocation-service';


export type LocationObject = Geolocation.GeoPosition

const requestLocationPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Geolocation Permission',
                message: 'Can we access your location?',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        console.log('granted', granted);
        if (granted === 'granted') {
            console.log('You can use Geolocation');
            return true;
        } else {
            console.log('You cannot use Geolocation');
            return false;
        }
    } catch (err) {
        return false;
    }
};

// locationcontext
type Context = {
    location: LocationObject | undefined;
    setLocation: React.Dispatch<React.SetStateAction<LocationObject | undefined>>;
    permission: boolean,
    setPermission: React.Dispatch<React.SetStateAction<boolean>>
};
export const LocationContext = createContext<Context>({
    location: undefined,
    setLocation: () => null,
    permission: false,
    setPermission: () => null
});


// location provider
export function LocationProvider(props: { children: JSX.Element }) {
    const [location, setLocation] = useState<LocationObject>();
    const [permission, setPermission] = useState(false)

    useEffect(() => {
        async function GetPermission() {
            const result = await requestLocationPermission();
            if (result) {
                setPermission(true)
            }
            else {
                setPermission(false)
                setLocation(undefined)
            }
        }
        GetPermission()
    }, [])

    useEffect(() => {
        async function GetLocation() {
            const result = await requestLocationPermission();
            if (result) {
                Geolocation.getCurrentPosition(
                    position => {
                        console.log(position);
                        setLocation(position);
                    },
                    error => {
                        // See error code charts below.
                        console.log(error.code, error.message);
                        setLocation(undefined);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
                );
            }
        }
        if (!permission)
            GetLocation()
    }, [permission]);
    console.log(location)

    return (
        <LocationContext.Provider value={{ location, setLocation, permission, setPermission }}>
            {props.children}
        </LocationContext.Provider>
    );
}