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
                    <Text style={styles.txtName}> Teste nome </Text>
                <View style={styles.dataGray}>   
                    <Text style={styles.txtData}> 10/02/2022 </Text>
                </View>
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
        flexDirection: "column",
        height: 60,
        marginVertical: 4,
        backgroundColor: 'white',
        borderRadius: 6,
    },
    txtName : {
        //backgroundColor: 'gray',
        borderRadius: 6,
        color: '#3F92C5',
        fontSize: 22,
        fontWeight: "bold",
    },  
    txtData : {
        backgroundColor: 'purple',
    },
    dataGray: {
        flexDirection: "row",
        alignItems: "flex-end",
        backgroundColor: 'red',
        height: '60%',
    },
})


export default CardNextVacina;