import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MovieList from './components/list';
import Detail from './components/detail';
import Edit from './components/edit';
import Auth from './components/auth';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const AppNavigator = createStackNavigator({
  Auth:{screen: Auth},
  MovieList:{screen: MovieList},
  Detail:{screen: Detail},
  Edit:{screen: Edit},

})

const App = createAppContainer(AppNavigator);

export default App;