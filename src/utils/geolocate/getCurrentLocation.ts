import { Loader } from '@googlemaps/js-api-loader';
import { readable } from 'svelte/store';
import { currentLocation } from '@app/stores/location';

export const getCurrentLocation = async (
  coordinates: google.maps.LatLngLiteral) => {
  await new Loader({
    apiKey: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_API_KEY,
    libraries: ['places'],
  }).load();

  const geocoder = new google.maps.Geocoder();
  const latlng = new google.maps.LatLng(coordinates);

  let country: string;
  let city: string;
  let state_region: string;

  geocoder.geocode(
    { location: latlng },
    (
      results: google.maps.GeocoderResult[],
      status: google.maps.GeocoderStatus
    ) => {
      if (status === 'OK') {
        const details = results[0].address_components;
        details.forEach((_detail, i, details) => 
        details[i].types
        .forEach((_type, j, types) => {
          if (
            types[j] == 'locality' 
            || types[j] == 'sublocality' 
            || types[j] == 'sublocality_level_1'
          ) {
              city = details[i].long_name
            }

            if (
              types[j] == 'administrative_area_level_1') {
              state_region = details[i].long_name
            }

            if (
              types[j] == 'country') {
              country = details[i].short_name
            }
            
          })
          
        )
        currentLocation.set(`${city}, ${state_region}, ${country}`)
      } else {
        console.log('Geocoding failed');
      }
    }
  );
}

// LocationIQ
// export function getCity(coordinates: {lat: number, lng: number}) {
//   const lat = coordinates.lat; 
//   const lng = coordinates.lng;
  
//   const endpont = ``
  
//   fetch(endpont).then(res => res.json())
//   .then(result => {
//     const city = result.address.city
//     const country_code = result.address.country_code
//     console.log(city, country_code);
//     console.log('locationIQ', result);
//   })

// }

// export const useLocation = (coordinates: google.maps.LatLngLiteral) => readable<string | undefined>(undefined, set => {
//   const load = async () => {
//     await new Loader({
//       apiKey: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_API_KEY,
//       libraries: ['places'],
//     }).load();
  
//     const geocoder = new google.maps.Geocoder();
//     const latlng = new google.maps.LatLng(coordinates);
  
//     geocoder.geocode(
//       { location: latlng },
//       (
//         results: google.maps.GeocoderResult[],
//         status: google.maps.GeocoderStatus
//       ) => {
//         if (status === 'OK') {
//           const formatted_address = results[0].formatted_address;
//           set(formatted_address)
//           console.log('formatted address', formatted_address);
//           console.log('results', results);
//         } else {
//           console.log('Geocoding failed');
//         }
//       }
//     );
//   }
//   load()
// });