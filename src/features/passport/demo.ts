import { spots } from '../itinerary/demo';

export type StampKind = 'fast' | 'tour' | 'food' | 'river' | 'beach' | 'view' | 'culture' | 'night';
export type Stamp = { kind: StampKind; name: string; rule: string; progress: number; target: number; color: string };
export type PassportCity = { id: string; name: string; subtitle: string; visited: boolean; places: string[]; stamps: Stamp[] };
export type PassportCountry = { id: string; name: string; flag: string; subtitle: string; cities: PassportCity[] };

function stamps(progress: Partial<Record<StampKind, number>>, total: number): Stamp[] {
  return [
    { kind: 'fast', name: 'Fast explorer', rule: 'Visite 3 lugares diferentes no mesmo dia.', target: 3, color: '#A66A27' },
    { kind: 'tour', name: 'Tour completed', rule: `Visite os ${total} lugares da coleção da cidade, em qualquer ordem.`, target: total, color: '#7855AA' },
    { kind: 'food', name: 'Culinary expert', rule: 'Conheça 2 experiências de gastronomia local.', target: 2, color: '#B86248' },
    { kind: 'river', name: 'River addicted', rule: 'Visite 2 lugares junto ao rio.', target: 2, color: '#397C96' },
    { kind: 'beach', name: 'Beach addicted', rule: 'Conheça 2 praias da região da cidade.', target: 2, color: '#AB8028' },
    { kind: 'view', name: 'View collector', rule: 'Descubra 3 miradouros da cidade.', target: 3, color: '#658245' },
    { kind: 'culture', name: 'Culture hunter', rule: 'Visite 2 espaços culturais ou monumentos.', target: 2, color: '#7A699D' },
    { kind: 'night', name: 'Night owl', rule: 'Visite 2 lugares depois das 19h.', target: 2, color: '#626B9F' },
  ].map(stamp => ({ ...stamp, kind: stamp.kind as StampKind, progress: progress[stamp.kind as StampKind] ?? 0 }));
}

// Independent passport fixtures: no GPS, real trips, or persistent rewards.
export const passportCountries: PassportCountry[] = [
  { id: 'portugal', name: 'Portugal', flag: '🇵🇹', subtitle: 'Entre azulejos e boas histórias.', cities: [
    { id: 'lisboa', name: 'Lisboa', subtitle: 'Ladeiras, luz e um encontro com o Tejo.', visited: true, places: spots.filter(s => s.done).map(s => s.name), stamps: stamps({ fast: 3, tour: 4, food: 2, river: 1, culture: 2 }, 12) },
    { id: 'porto', name: 'Porto', subtitle: 'Fachadas azuis e memórias junto ao Douro.', visited: true, places: ['Ribeira', 'Ponte Dom Luís I'], stamps: stamps({ tour: 2, river: 2, food: 1 }, 10) },
  ] },
  { id: 'franca', name: 'França', flag: '🇫🇷', subtitle: 'Uma nova página à sua espera.', cities: [
    { id: 'paris', name: 'Paris', subtitle: 'Cafés, arte e passeios junto ao Sena.', visited: false, places: [], stamps: stamps({}, 12) },
    { id: 'nice', name: 'Nice', subtitle: 'Um encontro com o azul do Mediterrâneo.', visited: false, places: [], stamps: stamps({}, 8) },
  ] },
  { id: 'espanha', name: 'Espanha', flag: '🇪🇸', subtitle: 'Praças, sabores e descobertas.', cities: [
    { id: 'barcelona', name: 'Barcelona', subtitle: 'Arte pelas ruas, mar logo ali.', visited: false, places: [], stamps: stamps({}, 12) },
    { id: 'madrid', name: 'Madrid', subtitle: 'Museus, jardins e mesas cheias.', visited: false, places: [], stamps: stamps({}, 10) },
  ] },
];
export const isEarned = (stamp: Stamp) => stamp.progress >= stamp.target;
export const hasVisited = (country: PassportCountry) => country.cities.some(city => city.visited);
