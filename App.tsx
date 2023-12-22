import React from 'react';

import AppContainer from './src/AppContainer';
import db from './src/shared/database';

function App(): React.JSX.Element {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, username TEXT, password TEXT, phone TEXT)',
    );
  });

  return <AppContainer />;
}

export default App;
