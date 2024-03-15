import { CardData } from "./AddCard";

export interface SavedCardsProps {
  onClose: () => void;
  savedCards: CardData[] | undefined;
}
