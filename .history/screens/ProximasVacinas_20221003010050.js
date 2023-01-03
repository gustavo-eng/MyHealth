import React from "react";

import {
    View, 
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

const listaVacinas = [
    {
      vacina: 'BCG',
      data: '2022-09-21',
      
    },
    {
      vacina: 'DTpa',
      data: '2022-09-22',
            
    },
    {
      vacina: 'Sarampo',
      data: '2022-09-21',  
    },
       
    
]

const ProximasVacinas = (props) => {

    const  goToNew = () => {
        props.navigation.navigate('NovaVacina')
    }
    return (
        <View style={styles.principal}>
            <View>
                <Text style={styles.cards}>aqui vao os cards </Text>
                <Text style={styles.cards}>aqui vao os cards</Text>
                <Text style={styles.cards}>aqui vao os cards</Text>
            </View>
            <View style={styles.containerBTN}>
                
                        <TouchableOpacity style={styles.touch} onPress={goToNew}>
                            <Text style={styles.txt}> Nova vacina </Text>
                        </TouchableOpacity>            
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    principal: {
        flex: 1,
        flexDirection: "column",
    },
    containerBTN: {
        marginTop: 50,
        alignSelf: "flex-end",
        width: '100%',    
        height: '12%',  
        //backgroundColor: 'red',
        marginBottom: 40,
        alignItems: "center",  
        
    }, 
    touch: {
        borderRadius: 5,
        marginTop: 5,
        padding: 0,
        width: '30%',
        height: '46%',
        alignItems: "center",
        backgroundColor: '#37BD6D',
        paddingTop: 6,
        elevation: 6,
    },
    txt : {
        
        color: 'white',
        textAlign: "center",
        fontWeight: "bold"
        
    },
    cards : {
        marginTop: 5,
        backgroundColor: 'green',
    }
})

export default ProximasVacinas;