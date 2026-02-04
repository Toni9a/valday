export enum PageState {
  INTRO = 'INTRO',
  INTERVAL = 'INTERVAL',
  GAME = 'GAME',
  QUESTION = 'QUESTION',
  SUCCESS = 'SUCCESS'
}

export interface Card {
  id: number;
  pairId: number;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface PhotoPair {
  id: number;
  url: string;
}