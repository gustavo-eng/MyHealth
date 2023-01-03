import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import {View, Text, StyleSheet } from "react-native";

const MyDrawer = (props) => {
    return(
        <DrawerContentScrollView {...props}>
            <View style={styles.container}>
                <Text style={styles.text}>Ola Gustavo</Text>
                <View style={styles.line}/>
            </View>
            <DrawerItemList {...props} />
            <DrawerItem label="Proximas Vacinas (fix)"/>
            <DrawerItem label="Sair" onPress={() => {props.navigation.pop()}}/>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
    },
    text: {
        fontSize: 24,
        color: '#419ED7',
        fontWeight: "bold",
    },
    line : {
        backgroundColor: 'blue',
    }
})

export default MyDrawer;