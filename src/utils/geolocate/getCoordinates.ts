interface Coordinates {
  lat: number;
  lng: number;
}

type getCityFn = (coordinates: Coordinates) => void;

export function getCoordinates(fn: getCityFn) {
  const options = { 
    enableHighAccuracy: true, 
    timeout: 5000, 
    maximumAge: 0 
  }

  function success(position: {coords: {latitude: number, longitude: number}}) { 
    const crd = position.coords; 
    const lat = crd.latitude; 
    const lng = crd.longitude; 
    console.log(`Latitude: ${lat}, Longitude: ${lng}`); 

    fn({lat, lng}); 
    return; 

  } 

  function error(err: any) { 
    console.warn(`ERROR(${err.code}): ${err.message}`); 
  } 

  navigator.geolocation.getCurrentPosition(success, error, options);
}