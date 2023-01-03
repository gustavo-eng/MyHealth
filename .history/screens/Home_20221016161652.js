import { Text, Image } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import MyDrawer from '../components/MyDrawer'
import MinhasVacinas from './MinhasVacinas'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeCard from './HomeCard'
import NovaVacina from './NovaVacina'
import ProximasVacinas from './ProximasVacinas'
import EditarVacina from './EditarVacina'

const Drawer = createDrawerNavigator()

const Home = (props) => {
    return (

        <Drawer.Navigator drawerContent={(props) => <MyDrawer {...props} />} 
 
             screenOptions={
                 { drawerActiveTintColor: '#5ab3ec',
                 drawerLabelStyle: {color: '#419ED7'}, 
                 //drawerActiveBackgroundColor: '#419ED7', 
                //drawerInactiveBackgroundColor: 'blue', 
                drawerStyle: { backgroundColor: '#ADD4D0' } ,
                headerStyle: {backgroundColor: '#C1E7E3'},
                title: 'Minhas Vacinas', // pode alterar para cada tela, entao se atentar
                headerTintColor: '#419ED7',
                headerTitleStyle: {fontFamily: 'AveriaLibre-Bold', fontSize: 20,},
                sceneContainerStyle: {backgroundColor: '#ADD4D0'},               
                drawerIcon: () => (<Image
                                        style={{width: 20, height: 25, marginRight: -25}}
                                        source={require('../images/siringa.png')}
                                    />
                                  )
            }}
            >
           <Drawer.Screen name="HomeCard" component={HomeCard}/>
           <Drawer.Screen name="ProximasVacinas" component={ProximasVacinas} 
            options={{
                title: 'Próximas vacinas',
                drawerIcon: () => (<Image style={{width: 20, height: 20, marginRight: -25}}
                                   source={require('../images/calender.png')}   />
                                   )
            }}
           /> 
        </Drawer.Navigator>
    )
}



export default Home