/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, createRef, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  AppState,
} from 'react-native';

// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import { createStackNavigator } from 'react-navigation-stack';

import Login from './pages/Login';
import Home from './pages/Home';
import Edit from './pages/Edit';
import MyProfile from './pages/MyProfile';
import Questions from './pages/Questions';
import QuestionCreate from './pages/QuestionCreate';
import Images from './pages/Images';
import Message from './pages/Message';
import Ansver from './pages/Ansver';
import signalR, { HubConnectionBuilder, LogLevel, HubConnection, HttpTransportType } from '@aspnet/signalr'
import { getUserIdAsync } from './dataCrud/auth';
import Chat from './pages/Chat';
import apiConstant from './constants/apiConstant';
import RouterPage from './pages/RouterPage';
import AnsverResult from './pages/AnsverResult';
import AnsverResultDetail from './pages/AnsverResultDetail';

let hb = 0;
let ConnectionS = new HubConnectionBuilder()
  .withUrl(apiConstant.MESSAGE_HUB, {
    skipNegotiation: false,
    transport: HttpTransportType.LongPolling
  })
  // .configureLogging(LogLevel.Trace)
  .build()

let listenData = null;

let getData = (senderUserId, receiverUserId, type, message) => {


}






const hubConnect = async () => {
  if (hb == 0) {


    console.log("Başlangıç çöalışrı")


    // let UserId = await getUserIdAsync()
    // if (await ConnectionS.state === 0) {
    //   await ConnectionS.start()

    // }

    // await ConnectionS.invoke('joinHub', UserId)
    hb = 1;
    ConnectionS = await ConnectionS;




  }
}
hubConnect()
AppState

const disconnectHub = async () => {
  console.log("[app] disconnect gub connection")
  if (ConnectionS.state === 1) {

    await ConnectionS.stop();
  }


}

AppState.addEventListener('change', disconnectHub);


const App = () => {
  // const Stack = createStackNavigator();
  // return (
  //   <NavigationApp></NavigationApp>

  // );
}
const AppNavigator = createStackNavigator(

  {
    Home: {
      screen: Home,
      navigationOptions: {
        headerShown: false
      },
      params: {
        hubConnection: ConnectionS,
      }
    },
    Edit: {
      screen: Edit,
      navigationOptions: {
        headerShown: false
      }
    },
    AnsverResultDetail: {
      screen: AnsverResultDetail,
      navigationOptions: {
        headerShown: false
      }
    },
    AnsverResult: {
      screen: AnsverResult,
      navigationOptions: {
        headerShown: false
      }
    },
    RouterPage: {
      screen: RouterPage,
      navigationOptions: {
        headerShown: false
      }
    },
    MyProfile: {
      screen: MyProfile,
      navigationOptions: {
        headerShown: false,

      }
    },
    Questions: {

      screen: Questions,
      navigationOptions: {
        headerShown: false,

      },
      params: {
        hubConnection: ConnectionS,
      }
    },
    QuestionCreate: {
      screen: QuestionCreate,
      navigationOptions: {
        headerShown: false,
      },
      params: {
        hubConnection: ConnectionS,
      }
    },
    Images: {
      screen: Images,
      navigationOptions: {
        headerShown: false,
      },
      params: {
        hubConnection: ConnectionS,
      }
    }, Message: {
      screen: Message,
      navigationOptions: {
        headerShown: false,
      },
      params: {
        hubConnection: ConnectionS,
      }
    }, Ansver: {
      screen: Ansver,
      navigationOptions: {
        headerShown: false,
      },
      params: {
        hubConnection: ConnectionS,
      }
    }, Chat: {
      screen: Chat,
      navigationOptions: {
        headerShown: false,

      },
      params: {
        hubConnection: ConnectionS,
      }
    },

  });

export default createAppContainer(AppNavigator);

// export default App;
