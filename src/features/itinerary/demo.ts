// Deliberately local fixtures: this screen is a design prototype, not live travel data.
export const spots = [
  { name: 'Praça do Comércio', detail: 'Um começo com vista para o Tejo.', coordinates: { latitude: 38.7077, longitude: -9.1365 }, done: true },
  { name: 'Rua Augusta', detail: 'Olha para cima. Vale a pena.', coordinates: { latitude: 38.7098, longitude: -9.1371 }, done: true },
  { name: 'Elevador de Santa Justa', detail: 'Lisboa por outro ângulo.', coordinates: { latitude: 38.7121, longitude: -9.1394 }, done: true },
  { name: 'Largo do Carmo', detail: 'Uma pausa no meio da aventura.', coordinates: { latitude: 38.712, longitude: -9.1406 }, done: true },
  { name: 'Miradouro de Santa Luzia', detail: 'Azulejos, Tejo e um belo respiro.', coordinates: { latitude: 38.7119, longitude: -9.1304 }, done: false },
  { name: 'Castelo de São Jorge', detail: 'A cidade inteira aos seus pés.', coordinates: { latitude: 38.7139, longitude: -9.1335 }, done: false },
  { name: 'Sé de Lisboa', detail: 'Uma viagem dentro da viagem.', coordinates: { latitude: 38.7098, longitude: -9.1326 }, done: false },
  { name: 'Panteão Nacional', detail: 'Histórias de quem passou por aqui.', coordinates: { latitude: 38.7157, longitude: -9.1247 }, done: false },
  { name: 'Feira da Ladra', detail: 'Tesouros para quem olha com calma.', coordinates: { latitude: 38.7159, longitude: -9.1255 }, done: false },
  { name: 'Mosteiro dos Jerónimos', detail: 'Um encontro com a história.', coordinates: { latitude: 38.6979, longitude: -9.2067 }, done: false },
  { name: 'Torre de Belém', detail: 'Mais um cartão-postal para a coleção.', coordinates: { latitude: 38.6916, longitude: -9.216 }, done: false },
  { name: 'Jardim da Estrela', detail: 'Um final debaixo das árvores.', coordinates: { latitude: 38.7158, longitude: -9.1605 }, done: false },
];
export const visited = spots.filter((spot) => spot.done).length;

// Approximate demo coordinates only; no device location is read.
export const mockUserLocation = { latitude: 38.7135, longitude: -9.129 };
