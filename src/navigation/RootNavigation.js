import React, {useEffect, useReducer, useMemo} from 'react';
import {Provider, useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import LoadingDialog from '../components/LoadingDialog';
import {PersistGate} from 'redux-persist/integration/react';
import {horizontalAnimation} from './Animation';
import {AuthStackNavigator} from './stacks/AuthNavigator';
import {HomeStackNavigator} from './stacks/HomeNavigator';
import {persistor, store} from '../store/root.store';
import client from '../utils/Api';

export const AppStack = () => {
  const AppNav = createStackNavigator();
  //retrieve saved token and add to header before calls
  const {accessToken} = useSelector((x) => x.users);

  //add to header
  client.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  return (
    <Provider store={store}>
      <PersistGate
        loading={<LoadingDialog loading={true} />}
        persistor={persistor}>
        <AppNav.Navigator screenOptions={horizontalAnimation}>
          {!accessToken ? (
            <AppNav.Screen name="Auth" component={AuthStackNavigator} />
          ) : (
            <AppNav.Screen name="Home" component={HomeStackNavigator} />
          )}
        </AppNav.Navigator>
      </PersistGate>
    </Provider>
  );
};
