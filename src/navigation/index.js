import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import {useSelector, useDispatch} from 'react-redux';
import {navigationRef} from '../config/NavigationService';

// ---------------------Screens-----------------------
import Login from '../screen/login';
import Signup from '../screen/signup';
import Forget from '../screen/forget';
import Verify from '../screen/verify';
import Play from '../screen/play';
import Password from '../screen/password';
import Changepass from '../screen/changepas';
import Msg from '../screen/msg';
import Genre from '../screen/genre';
import Notification from '../screen/notification';

import Producer from '../screen/producer';
import Editprofile from '../screen/editprofile';
import Talent from '../screen/talent';
import Producerdetail from '../screen/producerdetail';
import Songwriter from '../screen/songwriter';
import Matches from '../screen/matches';
import Profile from '../screen/profile';
import Ins from '../screen/instrument';
import Addimage from '../screen/addimage';
import Groups from '../screen/groups';
import Others from '../screen/others';
import Own from '../screen/own';
import Chat from '../screen/chat';
import Friends from '../screen/friends';
import Otheruser from '../screen/friends/otherUser';
import Mate from '../screen/mate';
import Job from '../screen/job';
import Mypost from '../screen/mypost';
import Editpost from '../screen/editpost';
import Detailpost from '../screen/detailpost';
import Jobpost from '../screen/jobpost';
import Labchat from '../screen/labchat';
import messaging from '@react-native-firebase/messaging';
import bottomtab from '../bottomtab';
import {fcm_Update} from '../screen/apis';
import Loopverify from '../screen/loopverify';
export default function App({navigation}) {
  const Stack = createNativeStackNavigator();

  const dispatch = useDispatch();
  // const[resturanthas,setresturanthas]=useState()
  const {userData} = useSelector(({USER}) => USER);
  const {isLoggedIn} = useSelector(({USER}) => USER);

  console.log('::::data', userData);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isLoggedIn ? (
          <>
            {userData?.email_verified_at == null ? (
              <Stack.Screen name="loopverify" component={Loopverify} />
            ) : userData?.interest == null ? (
              <Stack.Screen name="talent" component={Talent} />
            ) : userData?.instrument == null ? (
              <Stack.Screen name="Ins" component={Ins} />
            ) : userData?.genre == null ? (
              <Stack.Screen name="genre" component={Genre} />
            ) : userData?.about_me == null ? (
              <Stack.Screen name="profile" component={Profile} />
            ) : userData?.images?.length == 0 ? (
              <Stack.Screen name="addimage" component={Addimage} />
            ) : (
              <Stack.Screen name="bottomtab" component={bottomtab} />
            )}

            <Stack.Screen name="msg" component={Msg} />

            <Stack.Screen name="notification" component={Notification} />
            <Stack.Screen name="editprofile" component={Editprofile} />
            <Stack.Screen name="producerdetail" component={Producerdetail} />
            <Stack.Screen name="songwriter" component={Songwriter} />
            <Stack.Screen name="matches" component={Matches} />
            <Stack.Screen name="groups" component={Groups} />
            <Stack.Screen name="others" component={Others} />
            <Stack.Screen name="job" component={Job} />
            <Stack.Screen name="jobpost" component={Jobpost} />
            <Stack.Screen name="mypost" component={Mypost} />
            <Stack.Screen name="editpost" component={Editpost} />
            <Stack.Screen name="detailpost" component={Detailpost} />

            <Stack.Screen name="producer" component={Producer} />
            <Stack.Screen name="friends" component={Friends} />
            <Stack.Screen name="otheruser" component={Otheruser} />

            <Stack.Screen name="own" component={Own} />
            <Stack.Screen name="mate" component={Mate} />
            <Stack.Screen name="labchat" component={Labchat} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="changepass" component={Changepass} />
          </>
        ) : (
          <>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="signup" component={Signup} />
            <Stack.Screen name="forget" component={Forget} />
            <Stack.Screen name="verify" component={Verify} />
            <Stack.Screen name="password" component={Password} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
