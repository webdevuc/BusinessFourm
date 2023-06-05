if(__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}
import 'react-native-gesture-handler';
import {RootNavigator} from './src/Components/Navigations/index';
import {Provider as StoreProvider} from 'react-redux';
import {persistor, store} from './src/store';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <>
      <StoreProvider store={store}>
        <PersistGate persistor={persistor}>
          <RootNavigator />
        </PersistGate>
      </StoreProvider>
    </>
  );
}

export default App;
