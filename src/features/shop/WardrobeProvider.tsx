import { createContext, ReactNode, useContext, useState } from 'react';
import { spots, visited } from '../itinerary/demo';
import { acquire, equip, initialWardrobe, TravelProgress, Wardrobe } from './catalog';
// Session-only demo. Production rewards and spending must be validated by the server.
export const demoTravel: TravelProgress = {
  'city:Lisboa': { visited: visited > 0, completed: visited, total: spots.length },
  'city:Paris': { visited: false, completed: 0, total: 12 },
  'country:Portugal': { visited: visited > 0, completed: 0, total: 4 },
};
const Context = createContext<{ wardrobe: Wardrobe; acquireItem: (id: string) => void; equipItem: (id: string) => void } | null>(null);
export function WardrobeProvider({ children }: { children: ReactNode }) {
  const [wardrobe, setWardrobe] = useState(initialWardrobe);
  return <Context.Provider value={{ wardrobe, acquireItem: (id) => setWardrobe((current) => acquire(current, id, demoTravel)), equipItem: (id) => setWardrobe((current) => equip(current, id)) }}>{children}</Context.Provider>;
}
export function useWardrobe() {
  const context = useContext(Context);
  if (!context) throw new Error('useWardrobe requires WardrobeProvider');
  return context;
}
