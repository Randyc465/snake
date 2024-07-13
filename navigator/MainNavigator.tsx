import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from '../screen/LoginScreen';
import JuegoScreen from '../screen/JuegoScreen';
import RegisterScreen from '../screen/RegisterScreen';
import Game from '../src/Components/Game';
import Board from '../src1/components/Board';
import PerfilScreen from '../screen/PerfilScreen';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();


function MyTabs() {
  return (
    <Tab.Navigator>
      
      {/* <Tab.Screen name="menu" component={MenuScreen} /> */}
      <Tab.Screen name="Subir imagen" component={JuegoScreen} />
      <Tab.Screen name="Juego: Serpiente" component={Game} />
    </Tab.Navigator>
  );
}

function MyStack() {
    return (
      <Stack.Navigator initialRouteName='Regístrate'> 
        <Stack.Screen name="Inicio" component={MyTabs} />
        <Stack.Screen name="Regístrate" component={RegisterScreen} />
        <Stack.Screen name="Ingreso" component={LoginScreen} />
        <Stack.Screen name='Perfil' component={PerfilScreen}/>
      </Stack.Navigator>
    );
  }

export default function TopTabNavigator(){
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}
