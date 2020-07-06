import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import Expression from './Expression';

const DictionaryEntryExpansion = ({expressions}) => {
  return (
    <View>
      {expressions[0]
        ? expressions.map(
            expression =>
              (expression = (
                // probably a bad key, should find a better one
                <Expression key={expression.source} expressions={expression} />
              )),
          )
        : null}
    </View>
  );
};

export default DictionaryEntryExpansion;
