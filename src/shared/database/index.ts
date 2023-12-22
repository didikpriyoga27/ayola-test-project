import {Alert} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

import {SQLError} from './../../../node_modules/@types/react-native-sqlite-storage/index.d';

// Open a database connection
const db = SQLite.openDatabase(
  {
    name: 'users.db',
    location: 'default',
  },
  () => {},
  (error: SQLError) => {
    Alert.alert('Error opening database', String(error));
  },
);

export default db;
