import React, {useEffect, useReducer, useMemo} from 'react';
import {Provider, useSelector} from 'react-redux';
import {store, persistor} from '../store/Store';
import {createStackNavigator} from '@react-navigation/stack';
import LoadingDialog from '../components/LoadingDialog';
import {PersistGate} from 'redux-persist/integration/react';
import {horizontalAnimation} from './Animation';
import { AuthStackNavigator } from './stacks/AuthNavigator';
import { HomeStackNavigator } from './stacks/HomeNavigator';

const AppNav = createStackNavigator();
export const AppStack = ({state}) => {
  const renderLoading = () => <LoadingDialog loading={true} />;

  //console.log("state is ", state)
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={renderLoading()}>
        <AppNav.Navigator screenOptions={horizontalAnimation}>
          {state.userToken == null ? (
            <AppNav.Screen name="Auth" component={AuthStackNavigator} />
          ) : (
            <AppNav.Screen name="Home" component={HomeStackNavigator} />
          )}
        </AppNav.Navigator>
      </PersistGate>
    </Provider>
  );
};
