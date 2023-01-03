import React, {useEffect} from "react";

import {
    View, 
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList
} from 'react-native';


import { listaVacinas } from "./HomeCard";
import CardNextVacina from "../components/CardNextVacina";

//FireStore
import { db } from "../config/firebase";
import {collection, doc, onSnapshot, query} from 'firebase/firestore'

const ProximasVacinas = (props) => {

    const  goToEditarVacinas = () => {
        props.navigation.navigate('EditarVacina')
    }    
    
    // teste de verificacao   ---------------------------------------
    
    //var partesData = strData.split("/");
    //var data = new Date(partesData[2], partesData[1] - 1, partesData[0]);
    
    // if(data < new Date()) {
    //     console.log('data da proxima menor')
    // }
    // if(data > new Date()) {
    //     console.log('data  proxima MAIOR')
    //     console.log(`configuraada ${data}`)
    // }
    let v = [] 
    // const nextData = listaVacinas.filter(element => {  // DAQUI SERA TRABALHADO COM AS DATAS DO FIREBASE!!!!!!!!!
    //     let dataFormatada = element.proximaVacina
    //     let pieceData =  dataFormatada.split("/")
    //     let dataFinal = new Date(pieceData[2], pieceData[1] - 1, pieceData[0])
    //     if (dataFinal > new Date()) {
    //         v.push(element) // teste
    //         return element
    //     }                
    // })
    
    console.log(v) // correct  (vetor com proxima vacina alem)
     
    // =-------------------------------------------------------render 
    
    // teste de verificacao   ---------------------------------------
    useEffect(() => {
        onSnapshot(q, (result) => {
            const listaDeVacinas = []
            result.forEach((doc) => { // poderia ser qualquer coisa alem de doc 
                listaDeVacinas.push({
                    id: doc.id,
                    data: doc.data().data,
                    dose: doc.data().dose,
                    proximaData: doc.data().proximaData,
                    urlImage: doc.data().urlImage, // pode NAO PRECISAR E TRAVAR O SISTEMA !!
                    vacina: doc.data().vacina,   

                }) 
            })
            setVacinas(listaDeVacinas)
            console.log('\n\n\n\n\n Lista de Vacina FIRESTORE --> ')
            console.log(vacinas)
            
        })
    }, [])

    return (
        <View style={styles.principal}>

            <FlatList 
                data={null} 
                renderItem={(item) => <CardNextVacina item={item} />}
                numColumns={1}
            />
            <View style={styles.containerBTN}>
                
                        <TouchableOpacity style={styles.touch} >
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
        alignSelf: "center",
        width: '100%',    
        height: '12%',  
        
        //backgroundColor: 'red',
        marginBottom: 40,
        alignItems: "center",  
        
    }, 
    touch: {
        borderRadius: 5,
        //marginTop: 5,
        padding: 0,
        width: '30%',
        height: '46%',
        alignItems: "center",
        backgroundColor: '#37BD6D',
        paddingTop: '2%',
        elevation: 6,
    },
    txt : {
        
        color: 'white',
        textAlign: "center",
        fontFamily: 'AveriaLibre-Bold',
        fontSize: 17,
        
    },
    cards : {
        marginTop: '5%',
        backgroundColor: 'green',
    }
})

export default ProximasVacinas;