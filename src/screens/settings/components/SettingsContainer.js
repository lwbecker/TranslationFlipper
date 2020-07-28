import React, { useState, useEffect, useCallback, useContext } from 'react';

// Components
import { StatusBar, Alert, StyleSheet, View } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Form,
  Picker,
} from 'native-base';
import NameBar from './NameBar';

// Utils
import {
  getUser,
  setUser,
  clearWordList,
  getUserWordList,
  getAllUsers,
} from '../../../utils/storage';

// Context
import UserContext from '../../../contexts/UserContext';

// Styles
const styles = StyleSheet.create({
  wordListContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  wordList: {
    flex: 5,
    flexDirection: 'row',
  },
  refresh: {
    flex: 1,
    flexDirection: 'row',
  },
});

// Vars
const NEW_USER = 'New User';

const updateData = (inputText, setName) => {
  setName(inputText);
  setUser(inputText);
};

const getData = async () => getUser();

const clearWords = async () => {
  clearWordList();
};

const handleClearButtonPress = () => {
  Alert.alert(
    'Are you sure you want to delete all of your words?',
    'This action is irreversible. You will lose all of your word data.',
    [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      { text: 'Delete All Words', onPress: clearWords, style: 'danger' },
    ],
  );
};

const getUsers = async () => {
  const users = await getAllUsers();
  return users;
};

const SettingsContainer = () => {
  const [name, setName] = useContext(UserContext);
  const [inputText, setInputText] = useState('');
  const [userData, setUserData] = useState({});
  const [users, setUsers] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);

  const refreshList = useCallback(() => {
    getUserWordList(name).then(setUserData);
  }, [name]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, [setUsers]);

  useEffect(() => {
    getData().then(setName);
  }, [setName]);

  useEffect(() => {
    refreshList();
  }, [refreshList]);

  useEffect(() => {
    setInputVisible(false);
    setUser(name);
  }, [name]);

  const logOut = () => {
    setUser(null);
    setName(null);
  };

  const getWords = () => {
    const levels = Object.keys(userData || {});
    if (levels.length) {
      const words = levels.reduce(
        (obj, level) => ({
          ...obj,
          [level]: Object.keys(userData[level]),
        }),
        {},
      );

      return words;
    }

    return {};
  };

  const changeUser = (value) => {
    if (value !== NEW_USER) {
      setName(value);
    } else {
      setInputVisible(true);
    }
  };

  const getPickerItems = () => {
    const pickers = [...users, NEW_USER].map((user) => (
      <Picker.Item label={user} value={user} />
    ));
    return pickers;
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>{name ? `User: ${name}` : 'Log in below!'}</Title>
          </Body>
          <Right />
        </Header>
        <Container>
          <Content>
            <Form>
              <Picker
                mode="dropdown"
                placeholder={name}
                iosHeader="Select a user"
                iosIcon={<Icon name="chevron-down-outline" />}
                selectedValue={name}
                onValueChange={changeUser}>
                {getPickerItems()}
              </Picker>
            </Form>
            {!inputVisible ? null : (
              <NameBar
                setInputText={setInputText}
                updateData={() => updateData(inputText, setName)}
              />
            )}
            <View style={styles.wordListContainer}>
              <View style={styles.wordList}>
                <Text>User Data: {JSON.stringify(getWords())}</Text>
              </View>
              <Button transparent onPress={refreshList} style={styles.refresh}>
                <Icon name="refresh" />
              </Button>
            </View>
          </Content>
        </Container>
        <Footer>
          <FooterTab>
            <Button title="Clear word list" onPress={handleClearButtonPress}>
              <Text>Clear word list</Text>
            </Button>
            <Button title="Log out" onPress={logOut}>
              <Text>Log out</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    </>
  );
};

export default SettingsContainer;
