import algoliasearch from 'algoliasearch/lite';
import algoliasearchHelper from 'algoliasearch-helper';
import { createInstantSearch } from './src/core/createInstantSearchServer';

const createInstantSearchServer = () =>
  createInstantSearch(algoliasearch, algoliasearchHelper);

export { createInstantSearchServer as createInstantSearch };
