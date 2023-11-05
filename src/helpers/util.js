import {IMPORTANT_HEADER_ID, IMPORTANT_ID, SEARCH_ID} from './common';

export const uuidv4 = () => {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16),
  );
};

export const chooseBackground = id => {
  switch (id) {
    case IMPORTANT_ID:
      return 'bg-important';
    case IMPORTANT_HEADER_ID:
      return 'bg-important-100';
    case SEARCH_ID:
      return 'bg-search';
    default:
      return 'bg-normal';
  }
};

export const chooseColor = id => {
  switch (id) {
    case IMPORTANT_ID:
      return 'color-important';
    case IMPORTANT_HEADER_ID:
      return 'color-important-100';
    case SEARCH_ID:
      return 'color-search';
    default:
      return 'color-normal';
  }
};
