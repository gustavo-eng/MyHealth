import React, { useState } from "react";
import { 
    View, 
    Text, 
    Button,
    TextInput,
    StyleSheet,
    TouchableOpacity
    
} from "react-native";  

const RecuperarSenha = (props) => {
    
    const [email, setEmail] = useState()
    
    console.log('esqueci minha senha')
    const voltar = () => {
        props.navigation.pop()
    }
    return (
       <View> 
            <View style={styles.container}>
                <Text style={styles.emailRecoverText} > E-mail </Text>
                <TextInput style={styles.emailRecoverInput} value={email} onChangeText={setEmail}/>
            </View>
            <TouchableOpacity style={styles.botaoRecuperar} onPress={voltar}>
                <Text style={styles.textoRecuperar}> Recuperar Senha  </Text>
            </TouchableOpacity>
       </View>  
    )

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 275,
        flexDirection: "row",
        justifyContent: "center",
    },
    emailRecoverText: {
        //backgroundColor: 'red',
        width: 46,
        height: 30,
        marginTop: 5,
        marginLeft: -5,
        marginRight: 8,
        color: 'white',
        fontWeight: "bold",
    },
    emailRecoverInput: {
        backgroundColor: 'white',
        padding: 2,
        height: 30,
        width: 280,
        color: "#3F92C5",
    },
    botaoRecuperar: {
        backgroundColor: "#49B976",
        width: 135,
        height: 30,
        marginTop: 200,
        marginLeft: 140,
        borderRadius: 3,
        elevation: 5,
    },
    textoRecuperar: {
        color: 'white',
        marginLeft: 10,
        marginTop: 5,
        fontWeight: "bold",
    }

})

export default RecuperarSenha;

