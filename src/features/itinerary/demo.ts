// Deliberately local fixtures: this screen is a design prototype, not live travel data.
export const spots = [
  { name: 'Praça do Comércio', detail: 'Um começo com vista para o Tejo.', done: true },
  { name: 'Rua Augusta', detail: 'Olha para cima. Vale a pena.', done: true },
  { name: 'Elevador de Santa Justa', detail: 'Lisboa por outro ângulo.', done: true },
  { name: 'Largo do Carmo', detail: 'Uma pausa no meio da aventura.', done: true },
  { name: 'Miradouro de Santa Luzia', detail: 'Azulejos, Tejo e um belo respiro.', done: false },
  { name: 'Castelo de São Jorge', detail: 'A cidade inteira aos seus pés.', done: false },
  { name: 'Sé de Lisboa', detail: 'Uma viagem dentro da viagem.', done: false },
  { name: 'Panteão Nacional', detail: 'Histórias de quem passou por aqui.', done: false },
  { name: 'Feira da Ladra', detail: 'Tesouros para quem olha com calma.', done: false },
  { name: 'Mosteiro dos Jerónimos', detail: 'Um encontro com a história.', done: false },
  { name: 'Torre de Belém', detail: 'Mais um cartão-postal para a coleção.', done: false },
  { name: 'Jardim da Estrela', detail: 'Um final debaixo das árvores.', done: false },
];
export const visited = spots.filter((spot) => spot.done).length;
