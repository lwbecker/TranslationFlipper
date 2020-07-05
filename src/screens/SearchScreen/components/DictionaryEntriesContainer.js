import React from 'react';
import {ScrollView, Text} from 'react-native';
import PropTypes from 'prop-types';
import DictionaryEntry from './DictionaryEntry.js';

const DictionaryEntriesContainer = props => {
  const updateInfo = entryNum => {
    try {
      return JSON.stringify(props.data[entryNum].targets[0].lemma);
    } catch (error) {
      return error.toString();
    }
  };

  const getEntries = () => {
    const entries = [];
    for (entry in props.data)
      entries.push(
        <DictionaryEntry entryNum={entry} updateInfo={updateInfo} />,
      );
    return entries;
  };

  return (
    <ScrollView>
      <Text>Entries Below...</Text>
      {getEntries()}
    </ScrollView>
  );
};

export default DictionaryEntriesContainer;

DictionaryEntriesContainer.propTypes = {
  data: PropTypes.array.isRequired,
};
