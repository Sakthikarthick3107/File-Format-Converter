import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import  { createNativeStackNavigator } from "@react-navigation/native-stack";
import Conversion from "./screens/Conversion";
import Compression from "./screens/Compression";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigation = () =>{
    return(
        <Tab.Navigator screenOptions={({route}) => ({
            tabBarActiveTintColor:'white',
            tabBarInactiveTintColor:'#b3b5cc',
            tabBarHideOnKeyboard:true,
            tabBarStyle:{
                backgroundColor:'#2093ea'
            },
            tabBarLabelStyle:{
                fontSize:12,
                fontWeight:'bold',
                
            }
        })}>
            <Tab.Screen component={Conversion} name="Conversion" options={{headerShown:false}}/>
            <Tab.Screen component={Compression} name="Compression" options={{headerShown:false}}/>
        </Tab.Navigator>
    )
}


export const PageNavigation = () =>{
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen component={BottomTabNavigation} name="Home" options={{headerShown:false}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

