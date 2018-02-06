import PropTypes from 'prop-types';
import React, { Component } from 'react';
import InstantSearch from './InstantSearch';
import { version } from '../../package.json';

/**
 * Creates a specialized root InstantSearch component. It accepts
 * an algolia client and a specification of the root Element.
 * @param {function} defaultAlgoliaClient - a function that builds an Algolia client
 * @param {function} defaultAlgoliaHelper - a function that builds an Algolia helper
 * @param {object} root - the defininition of the root of an InstantSearch sub tree.
 * @returns {object} an InstantSearch root
 */
export default function createInstantSearch(
  defaultAlgoliaClient,
  defaultAlgoliaHelper,
  root
) {
  return class CreateInstantSearch extends Component {
    static propTypes = {
      algoliaClient: PropTypes.object,
      algoliaHelper: PropTypes.object,
      appId: PropTypes.string,
      apiKey: PropTypes.string,
      children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
      ]),
      indexName: PropTypes.string.isRequired,
      searchParameters: PropTypes.object,
      createURL: PropTypes.func,
      searchState: PropTypes.object,
      refresh: PropTypes.bool.isRequired,
      onSearchStateChange: PropTypes.func,
      onSearchParameters: PropTypes.func,
      resultsState: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
      root: PropTypes.shape({
        Root: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
          .isRequired,
        props: PropTypes.object,
      }),
    };

    static defaultProps = {
      refresh: false,
      root,
    };

    constructor(...args) {
      super(...args);

      this.client =
        this.props.algoliaClient ||
        defaultAlgoliaClient(this.props.appId, this.props.apiKey);

      this.helper =
        this.props.algoliaHelper ||
        defaultAlgoliaHelper(this.client, this.props.indexName);

      this.client.addAlgoliaAgent(`react-instantsearch ${version}`);
    }

    componentWillReceiveProps(nextProps) {
      const props = this.props;
      if (nextProps.algoliaClient) {
        this.client = nextProps.algoliaClient;
      } else if (
        props.appId !== nextProps.appId ||
        props.apiKey !== nextProps.apiKey
      ) {
        this.client = defaultAlgoliaClient(nextProps.appId, nextProps.apiKey);
      }
      this.client.addAlgoliaAgent(`react-instantsearch ${version}`);
    }

    render() {
      return (
        <InstantSearch
          createURL={this.props.createURL}
          indexName={this.props.indexName}
          searchParameters={this.props.searchParameters}
          searchState={this.props.searchState}
          onSearchStateChange={this.props.onSearchStateChange}
          onSearchParameters={this.props.onSearchParameters}
          root={this.props.root}
          algoliaClient={this.client}
          refresh={this.props.refresh}
          algoliaHelper={this.helper}
          resultsState={this.props.resultsState}
        >
          {this.props.children}
        </InstantSearch>
      );
    }
  };
}
