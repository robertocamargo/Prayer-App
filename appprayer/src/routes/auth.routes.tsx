import React from "react";
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';

import SignUp from "../pages/Signup";
import SignIn from "../pages/SignIn";

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () =>(
  <Auth.Navigator 
  screenOptions={{
    headerShown: false,
    headerStyle: { backgroundColor: '#312e38' }, 
  }}
  
  >
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
  </Auth.Navigator>
);

export default AuthRoutes;