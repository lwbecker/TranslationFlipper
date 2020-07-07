import React from 'react';
import { Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import DictionaryEntry from './DictionaryEntry';

const SEARCHING_MESSAGE = 'Searching....';

const DictionaryEntriesContainer = ({ data, emptyMessage, isSearching }) => {
  const getEntries = () => {
    if (emptyMessage.length !== 0) {
      return <Text>{emptyMessage}</Text>;
    }
    const entries = [];

    const pushEntries = (entry) => {
      entries.push(<DictionaryEntry key={entry} wordInfo={data[entry]} />);
    };

    Object.keys(data).map(pushEntries);
    return entries;
  };

  return (
    <ScrollView>
      {isSearching ? <Text>{SEARCHING_MESSAGE}</Text> : getEntries()}
    </ScrollView>
  );
};

DictionaryEntriesContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  emptyMessage: PropTypes.string.isRequired,
};

export default DictionaryEntriesContainer;
