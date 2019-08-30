export const mapboxAccessToken = "pk.eyJ1Ijoicm9va3NnYyIsImEiOiJjanptamVvd3UxMzkxM2xwbWd2b3E1bWZ6In0.dtut7RO3w4SiOar-J3sGLA";

export const getRoute = (from, to) =>
  fetch(
    `https://loft-taxi.glitch.me/route?address1=${from}&address2=${to}`
  ).then(response =>
    response.status !== 200 ? Promise.reject(response) : response.json()
  );

export const getAddresslist = () =>
  fetch(
    `https://loft-taxi.glitch.me/addressList`
  ).then(response =>
    response.status !== 200 ? Promise.reject(response) : response.json()
  );