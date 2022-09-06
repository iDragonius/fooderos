import React, { useEffect, useRef, useState } from 'react'
import LocationModal from '../../../../../components/modals/locationModal/LocationModal'
import {
    Autocomplete,
    GoogleMap,
    Marker,
    useJsApiLoader,
} from '@react-google-maps/api'

const LocationMap = ({ open, setOpen, currentLoc, setCurrentLoc }) => {
    const [libraries] = useState(['places'])
    const [autoComp, setAutoComp] = useState(null)

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyAeUXvS7RSbIt1qaTLa50T_AnfMtfbKB18',
        libraries,
    })
    if (!isLoaded) {
        return <div></div>
    }
    const changePlace = () => {
        console.log(autoComp)
        setCurrentLoc({
            lat: autoComp.getPlace().geometry.location.lat(),
            lng: autoComp.getPlace().geometry.location.lng(),
        })
    }

    return (
        <LocationModal open={open} setOpen={setOpen}>
            <div className={'mb-3 flex w-full ml-3 mt-3'}>
                <Autocomplete
                    onLoad={(e) => setAutoComp(e)}
                    onPlaceChanged={changePlace}
                >
                    <input
                        className={'py-2 px-3 outline-none border-[1px] '}
                        type="text"
                        placeholder="Location"
                    />
                </Autocomplete>
                <button
                    className={'bg-primary text-white py-2 px-5 ml-4'}
                    onClick={() => setOpen(false)}
                >
                    Save
                </button>
            </div>

            <GoogleMap
                zoom={10}
                center={currentLoc}
                mapContainerStyle={{ width: '100%', height: '400px' }}
            >
                <Marker
                    position={currentLoc}
                    draggable={true}
                    onDragEnd={(e) => {
                        setCurrentLoc({
                            lng: e.latLng.lng(),
                            lat: e.latLng.lat(),
                        })
                    }}
                />
            </GoogleMap>
        </LocationModal>
    )
}

export default LocationMap
