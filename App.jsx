/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';


import Login from './src/screens/Login.jsx';
import Home from './src/screens/Home.jsx';

function App(){
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {true ? <Home /> : <Login setLogin={setIsLoggedIn}/>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
//adb -e emu finger touch 1
export default App;
