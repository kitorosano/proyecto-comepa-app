/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {ReactElement} from 'react';
import AppNavigation from './navigation/AppNavigation';
import {Provider as ReduxProvider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {store} from './redux/store';

function App(): ReactElement {
  return (
    <ReduxProvider store={store}>
      <SafeAreaProvider>
        <AppNavigation />
      </SafeAreaProvider>
    </ReduxProvider>
  );
}

export default App;
