export type HatStyle = 'cap' | 'beret' | 'explorer';
export type Appearance = { shirt: string; backpack: string; hat: { style: HatStyle; color: string } };
export type Milestone = { scope: 'city' | 'country'; place: string; kind: 'visit' | 'progress'; target: number };
export type Gear = { id: string; name: string; category: 'shirt' | 'hat' | 'backpack'; color: string; hatStyle?: HatStyle; price: number; rule?: Milestone; description: string };
export type TravelProgress = Record<string, { visited: boolean; completed: number; total: number }>;
export const catalog: Gear[] = [
  { id: 'cap', name: 'Boné de partida', category: 'hat', color: '#83BE52', hatStyle: 'cap', price: 0, description: 'Toda aventura começa com um primeiro passo.' },
  { id: 'uva', name: 'Camiseta uva', category: 'shirt', color: '#7950D5', price: 0, description: 'Sua companheira desde o primeiro carimbo.' },
  { id: 'forest', name: 'Camiseta floresta', category: 'shirt', color: '#397326', price: 0, description: 'Para quem sempre escolhe o caminho mais verde.' },
  { id: 'terra', name: 'Camiseta terracota', category: 'shirt', color: '#C16840', price: 0, description: 'Um tom quentinho para levar pelo mundo.' },
  { id: 'bag', name: 'Mochila de partida', category: 'backpack', color: '#DB943A', price: 0, description: 'Cabe um mundo de histórias aqui.' },
  { id: 'ocean', name: 'Boné oceano', category: 'hat', color: '#398EB5', hatStyle: 'cap', price: 150, description: 'Um pedacinho do mar para qualquer destino.' },
  { id: 'sunset', name: 'Camiseta pôr do sol', category: 'shirt', color: '#D85E7D', price: 200, description: 'Para colecionar finais de tarde inesquecíveis.' },
  { id: 'skybag', name: 'Mochila céu', category: 'backpack', color: '#4989BE', price: 300, description: 'Leve nas costas. Cheia de possibilidades.' },
  { id: 'portugal', name: 'Camiseta boas-vindas', category: 'shirt', color: '#27877D', price: 0, rule: { scope: 'country', place: 'Portugal', kind: 'visit', target: 1 }, description: 'Uma lembrança do seu primeiro check-in em Portugal.' },
  { id: 'lisbon', name: 'Boné dos miradouros', category: 'hat', color: '#D79641', hatStyle: 'cap', price: 0, rule: { scope: 'city', place: 'Lisboa', kind: 'progress', target: 50 }, description: 'Metade de Lisboa explorada. Muitas vistas pela frente.' },
  { id: 'paris', name: 'Boina parisiense', category: 'hat', color: '#383347', hatStyle: 'beret', price: 0, rule: { scope: 'city', place: 'Paris', kind: 'progress', target: 100 }, description: 'Paris completa, estilo à altura. Seu troféu de vestir.' },
  { id: 'france', name: 'Camiseta bonjour', category: 'shirt', color: '#426AA6', price: 0, rule: { scope: 'city', place: 'Paris', kind: 'visit', target: 1 }, description: 'Seu primeiro encontro com a Cidade Luz.' },
  { id: 'explorer', name: 'Chapéu explorador', category: 'hat', color: '#C19A68', hatStyle: 'explorer', price: 0, rule: { scope: 'country', place: 'Portugal', kind: 'progress', target: 50 }, description: 'Metade das cidades do catálogo de Portugal concluídas.' },
  { id: 'goldbag', name: 'Mochila de ouro', category: 'backpack', color: '#CBA02F', price: 0, rule: { scope: 'country', place: 'Portugal', kind: 'progress', target: 100 }, description: 'Todas as cidades do catálogo de Portugal. Uma conquista de ouro.' },
];
export function ruleProgress(rule: Milestone, travel: TravelProgress) {
  const place = travel[`${rule.scope}:${rule.place}`];
  if (!place) return 0;
  if (rule.kind === 'visit') return place.visited ? 100 : 0;
  return place.total > 0 ? Math.min(100, Math.floor(place.completed / place.total * 100)) : 0;
}
export function isUnlocked(item: Gear, travel: TravelProgress) {
  return !item.rule || ruleProgress(item.rule, travel) >= (item.rule.kind === 'visit' ? 100 : item.rule.target);
}
export function requirement(item: Gear) {
  const rule = item.rule;
  if (!rule) return 'Disponível para você';
  if (rule.kind === 'visit') return `Faça seu primeiro check-in em ${rule.place}`;
  if (rule.scope === 'country') return `Conclua ${rule.target}% das cidades de ${rule.place}`;
  return rule.target === 100 ? `Complete ${rule.place}` : `Complete ${rule.target}% de ${rule.place}`;
}
export type Wardrobe = { balance: number; owned: string[]; equipped: Record<Gear['category'], string> };
export const initialWardrobe: Wardrobe = { balance: 400, owned: ['cap', 'uva', 'forest', 'terra', 'bag'], equipped: { hat: 'cap', shirt: 'uva', backpack: 'bag' } };
export function acquire(state: Wardrobe, id: string, travel: TravelProgress): Wardrobe {
  const item = catalog.find((gear) => gear.id === id);
  if (!item || !isUnlocked(item, travel) || state.owned.includes(id) || state.balance < item.price) return state;
  return { ...state, balance: state.balance - item.price, owned: [...state.owned, id] };
}
export function equip(state: Wardrobe, id: string): Wardrobe {
  const item = catalog.find((gear) => gear.id === id);
  if (!item || !state.owned.includes(id)) return state;
  return { ...state, equipped: { ...state.equipped, [item.category]: id } };
}
export function appearance(state: Wardrobe, preview?: Gear): Appearance {
  const items = Object.values(state.equipped).map((id) => catalog.find((item) => item.id === id)!);
  if (preview) items[items.findIndex((item) => item.category === preview.category)] = preview;
  const hat = items.find((item) => item.category === 'hat')!;
  return { shirt: items.find((item) => item.category === 'shirt')!.color, backpack: items.find((item) => item.category === 'backpack')!.color, hat: { style: hat.hatStyle!, color: hat.color } };
}
