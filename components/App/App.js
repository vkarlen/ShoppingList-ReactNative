import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import {v4 as uuidv4} from 'uuid';

import Header from '../Header/Header';
import ListItem from '../ListItem/ListItem';
import AddItem from '../AddItem/AddItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
});

const App = () => {
  const [items, setItems] = useState([
    {
      id: uuidv4(),
      text: 'Apple',
    },
    {
      id: uuidv4(),
      text: 'Milk',
    },
    {
      id: uuidv4(),
      text: 'Banana',
    },
    {
      id: uuidv4(),
      text: 'Juice',
    },
  ]);

  const deleteItem = id => {
    Alert.alert('Are you sure?', 'This cannot be undone.', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Yes',
        onPress: () => {
          setItems(prevItems => {
            return prevItems.filter(item => item.id != id);
          });
        },
      },
    ]);
  }; // end deleteItem

  const addItem = text => {
    if (!text) {
      Alert.alert('Error', 'Please add an item', {text: 'Okay'});
    } else {
      setItems(prevItems => {
        return [{id: uuidv4(), text}, ...prevItems];
      });
    }
  }; // end addItem

  return (
    <View style={styles.container}>
      <Header title="Shopping List" />
      <AddItem addItem={addItem} />

      <FlatList
        data={items}
        renderItem={({item}) => (
          <ListItem item={item} deleteItem={deleteItem} />
        )}
      />
    </View>
  );
};

export default App;
