import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,

} from 'react-native'


const CardNextVacina = (props) => {

    const {item} = props?.item


    return (
        <View  style={styles.container}>
            <View style={styles.conteudoContainer}>
                <Text style={styles.txt}> Teste nome </Text>
                <Text> 10/02/2022 </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        marginTop: 8,
        flexDirection: "column",
        //backgroundColor: 'purple',
        marginHorizontal: 6,
    },
    conteudoContainer: {
        height: 60,
        marginVertical: 4,
        backgroundColor: 'white',
        borderRadius: 6,
    },
    txt : {
        backgroundColor: 'white',
        borderRadius: 6,
    },  
})


export default CardNextVacina;