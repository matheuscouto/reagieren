import { IDictionary, IMoveSet } from '../../declarations';

export const mockDictionary:IDictionary = {
  'daoenfeaj': {
    word: 'Bier',
    article: 'das',
    meaning: 'Beer',
  },
  'daoenfdsaeaj': {
    word: 'Madchen',
    article: 'das',
    meaning: 'Girl',
  },
  'daosdenfdsaeaj': {
    word: 'Junge',
    article: 'die',
    meaning: 'Boy',
  },
  'daosdenfdsasdaeaj': {
    word: 'Büch',
    article: 'das',
    meaning: 'Book',
  },
  'daosdsaeaj': {
    word: 'Stuhl',
    article: 'der',
    meaning: 'Stool',
  },
}

export const mockWordings:{[move: string]: string} = {
  artikel: 'Komplett mit dem richtigen Artikel'
}
