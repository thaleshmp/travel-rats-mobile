export type Coordinates = { latitude: number; longitude: number };

/** Straight-line distance in metres, not a walking route. */
export function distanceInMeters(from: Coordinates, to: Coordinates) {
  const radians = Math.PI / 180;
  const lat = (to.latitude - from.latitude) * radians;
  const lon = (to.longitude - from.longitude) * radians;
  const a = Math.sin(lat / 2) ** 2 + Math.cos(from.latitude * radians) * Math.cos(to.latitude * radians) * Math.sin(lon / 2) ** 2;
  return 6371000 * 2 * Math.asin(Math.sqrt(Math.max(0, Math.min(1, a))));
}

export function orderByProximity<T extends { coordinates: Coordinates }>(spots: readonly T[], location: Coordinates) {
  return spots.map((spot) => ({ ...spot, distanceMeters: distanceInMeters(location, spot.coordinates) }))
    .sort((a, b) => a.distanceMeters - b.distanceMeters);
}

export function formatDistance(meters: number) {
  const rounded = Math.round(meters / 10) * 10;
  return rounded < 1000 ? `${rounded} m` : `${(rounded / 1000).toFixed(1).replace(/\.0$/, '').replace('.', ',')} km`;
}

export const CHECK_IN_RADIUS_METERS = 150;

export function canCheckIn(spot: { done: boolean; distanceMeters: number }) {
  return !spot.done && Number.isFinite(spot.distanceMeters)
    && spot.distanceMeters >= 0 && spot.distanceMeters < CHECK_IN_RADIUS_METERS;
}
