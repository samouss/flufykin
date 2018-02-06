import algoliasearch from 'algoliasearch/reactnative';
import algoliasearchHelper from 'algoliasearch-helper';
import createInstantSearch from './src/core/createInstantSearch';
import createIndex from './src/core/createIndex';
import { View } from 'react-native';

const InstantSearch = createInstantSearch(algoliasearch, algoliasearchHelper, {
  Root: View,
});

const Index = createIndex({
  Root: View,
});

export { InstantSearch };
export { Index };
export { default as Configure } from './src/widgets/Configure.js';
