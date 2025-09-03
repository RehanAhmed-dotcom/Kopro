/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {navigateto} from './src/config/NavigationService';
import React, {useEffect} from 'react';

const Kopro = () => {
  const handleDynamicLink = link => {
    console.log('{}{}{}{}{}ddd{}{}{', link);

    const id_data = link.url.match(/[0-9]+/);

    console.log('{}{}{}{}{}{}{}{', id_data[0]);
    navigateto('producerdetail', {dataitem: id_data[0]});
  };
  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, []);
  return <App />;
};
AppRegistry.registerComponent(appName, () => Kopro);
