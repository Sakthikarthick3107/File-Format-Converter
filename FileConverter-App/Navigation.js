import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import  { createNativeStackNavigator } from "@react-navigation/native-stack";
import Conversion from "./screens/Conversion";
import Compression from "./screens/Compression";
import { MaterialIcons } from '@expo/vector-icons';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: '#b3b5cc', 
                tabBarHideOnKeyboard: true,
                tabBarLabelPosition: 'below-icon',
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 20,
                    height: 60,
                    marginHorizontal: 20,
                    borderRadius: 30,
                    backgroundColor: '#19C37D',
                    elevation: 5,
                    shadowOffset: {
                        width: 0,
                        height: -4
                    },
                },
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontWeight: 'bold',
                    marginBottom: 5
                },
                tabBarIcon: ({ focused, color }) => {
                    let iconName = route.name === 'Conversion' ? 'change-circle' : 'compress';
                    return <MaterialIcons name={iconName} size={28} color={color} />;
                }
            })}
        >
            <Tab.Screen component={Conversion} name="Conversion"  options={{headerTitle:'Convert file formats',headerTitleStyle:{
                color:'white' , fontSize:20
            } , headerStyle:{
                backgroundColor:'#19C37D' 
            } }} />
            <Tab.Screen component={Compression} name="Compression" options={{ headerShown: false }} />
        </Tab.Navigator>
    );
};




export const PageNavigation = () =>{
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen component={BottomTabNavigation} name="Home" options={{headerShown:false}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

