import React, {useEffect, useState} from "react";
import {
    View, 
    Text,
    TextInput,
    StyleSheet, 
    TouchableOpacity,
    Image,
    Linking,
    

} from 'react-native';


//FireStore 
import {addDoc, collection ,doc} from "firebase/firestore"
import { db, storage } from "../config/firebase";
 

// Storage upload de arquivos 
import { launchCamera, launchImageLibrary } from "react-native-image-picker"; 
import { uploadBytes, ref, getDownloadURL } from "firebase/storage"


import Radio from "../components/Radio";
import DatePicker from "react-native-date-picker";
//import { listaVacinas } from "./HomeCard";


//GeoLocation
import Geolocation from "@react-native-community/geolocation";
import MapView, {Marker} from "react-native-maps";

//Redux
import { useSelector } from "react-redux"; 

//Redux
import { useDispatch } from "react-redux";
import { reducerSetVacina } from "../redux/vacinaSlice";







const NovaVacina = (props) => {
    const dispatch = useDispatch()
    const [latitude, setLatitude] = useState(0) 
    const [longitude, setLongitude] = useState(0)

    
 

    useEffect( () => {
        Geolocation.getCurrentPosition( (position ) => {
                     setLatitude(position.coords.latitude)
                     setLatitude(position.coords.longitude)
            dispatch(reducerSetVacina({
                longitude:  position.coords.longitude, 
                latitude: position.coords.latitude,
            }))
                     
        })
        
        Geolocation.watchPosition((position) => { 
            console.log('dentro de watchPosition')
            setLatitude(position.coords.latitude) 
            setLongitude(position.coords.longitude)
            
            console.log('Longitudee em useEffect t  ')
            
            console.log(latitude)
            console.log(position.coords.latitude)
            
            
        },
        (error) => {
            console.log(`Erro ao captar localizacao erro ==> ${error}`)  
        }, 
        {
            
            distanceFilter: 1,  
        })   
         
    }, []) 
       
    
    
   
    const [selected, setSelected] = useState(0)
    
    const [date, setDate] = useState(new Date()) 
    const [open, setOpen] = useState(false)
    const [data, setData] = useState('') 
    const [proximaData, setProximaData] = useState('') 
    
    //FireStore 
    const [vacina, setVacina] = useState('')
    const [dose, setDose] = useState(0) 
    const [urlImage, setUrlImage] = useState('')
    
    //Storage  
    const [urlFoto, setUrlFoto] = useState('')
    const [pathFoto, setPathFoto] = useState(null)
    
    // diferenciacao entre data atual e proxima data
    const [atualData, setAtualData] = useState(false)
    const currentDate = () => {
        setAtualData(true)
        setOpen(true)
    }
    vetor = []
    
    
    const [email, setEmail] = useState(useSelector((state) => state.login.email))

    const userDb = 'user/' + email + '/MyVacinas';

   
  

    const showOnGoogleMaps = () => { 
        console.log('Show on GoogleMaps')
        Linking.openURL(`https://maps.google.com?q=${latitude},${longitude}`) //+ change plus
    }
    const getPressedLocation = (e) => { // vai para tela editar  
        setLatitude(e.nativeEvent.coordinate.latitude)
        setLongitude( e.nativeEvent.coordinate.longitude) 
        dispatch(reducerSetVacina({
            longitude:  e.nativeEvent.coordinate.longitude, 
            latitude: e.nativeEvent.coordinate.latitude,
        })) 
        console.log('Longitudeeeeeee em getPressed')
        console.log(longitude) 
           
    }
    //GEOLOCALIZACAO ---------------------------  ---------------------------  -------------------------- -  ---------------------------  ---------------------------

    //cadastrar  
    const novaVacina = async () => { // isso aqui alterar e eh pra ir la para a vacina editar vacinas, isso aqui fu nciona  listaVacinas[listaVacinas.length - 1].id = 1000, 
     
        
        const dados = await fetch(urlFoto) 
        const blob =  await dados.blob() //  .blob()  transforma pega os dados no formato binario  
        const arrayString = urlFoto.split('-')
        const lastIndex = arrayString.length - 1

        const filename = "images/" + arrayString[lastIndex] 

        // Redux 

        
        uploadBytes(ref(storage, filename), blob)
        .then((result) => { 
            console.log('Arquivo enviado com sucesso')
            getDownloadURL(ref(storage, filename))
            .then((url) => {
                dispatch(reducerSetVacina({
                    vacina: vacina,
                    dose: dose, 
                    urlImage: url,
                    data: data,
                    proximaData: proximaData,
                    longitude:  longitude, 
                    latitude: latitude,
                })) 
                console.log('Url: ' + url)
                addDoc(collection(db, userDb), { 
                    vacina: vacina,
                    data: data,
                    dose: selected,
                    urlImage: url,  
                    proximaData: proximaData, 
                    pathFoto: filename, 
                    email: email, 
                    latitude: latitude,
                    longitude: longitude,  
                })
                .then(()=> {
                    dispatch(reducerSetVacina({
                        vacina: vacina,
                        dose: dose, 
                        urlImage: url,
                        data: data,
                        proximaData: proximaData,
                        longitude:  longitude, 
                        latitude: latitude,
                    }))
                    props.navigation.pop() 
                }).catch((erro) => {
                    console.log('\n\n ERRO NO CADASTRO DA VACINA (NovaVacina.js)')
                    
                })
            }).catch((erro) => {
                console.log('Nao foi possivel fazer o download da imagem') 
            })
        }).catch((erro) => { 
            console.log('Erro ao enviar o arquivo ' + erro)
        })
 
         

    }

    const showImagePicker = () => {
        console.log('Clicou no "Selecionar imagem..." ')
        launchImageLibrary()
        .then((result) => {
            console.log('showImagePicker realizado com sucesso ')
            setUrlFoto(result.assets[0].uri)
        }).catch((error) => {
            console.log('Erro ao carregar galeria ' + error)
  
        }) 
    }

      
    
    return ( 
        <View style={styles.container}>
            { (open)? (
                <DatePicker
                modal={true}
                open={open} 
                date={date}
                mode="date"
                textColor="#3F92C5"  
                title={ atualData ? 'Alterar data atual da vacina ' : 'Próxima vacina'}
                locale='pt-br'
                              
                
                onConfirm={(date) => {
                  setOpen(false) 
                  setDate(date) 
                  if(atualData) { 
                  
                     setData(date.toLocaleDateString('pt-br'))
                     setAtualData(false)
                  } else {
                     setProximaData(date.toLocaleDateString('pt-br'))
                  }
                  
                }}

                onCancel={() => {             
                    setOpen(false)
                }}   
              />
              ): null
                    
            }
           <View style={styles.dataVacina}>
                <Text style={styles.rotulos}> Data de Vacinação</Text>
                <TouchableOpacity style={styles.btnCalender} onPress={currentDate}>
                    <Text style={styles.inputDados}>{data}</Text>
                    <Image
                            style={styles.icone}
                            source={require('../images/calender.png')}
                    />
                </TouchableOpacity>
           </View>
           <View style={styles.caixaDeDados}>
                <Text style={styles.rotulos}> Vacina </Text>
                <TextInput style={styles.inputDados} placeholder="Nome da vacina" value={vacina} onChangeText={setVacina} /> 
           </View>
           <View style={styles.radio}>
                <Radio 
                    rotulo = 'Dose'
                    selected={selected} // vai  mostrar a options default
                    alternativas={['Dose única','1a. dose', '2a. dose','3a. dose']} 
                    horizontal={true} 
                    // PARA entrega, pode nao precisar do alert 
                    onChangeSelect={(alternativa, i) => { 
                        setSelected(i) 
                    }} 
                  
                /> 
            </View> 
            <View style={styles.selecionaImagem}>
                <Text style={styles.rotulos}> Comprovante </Text>
                <TouchableOpacity style={styles.imagem} onPress={showImagePicker}>
                    <Text style={styles.textImagem}> Selecionar imagem...</Text>
                </TouchableOpacity>
           </View>
           <Image
                style={{width: 200, height: 85, alignItems: "flex-end", marginLeft: 155 }}
                      //source={require('../images/comprovanteVacina.jpg')}
                      source={{uri: urlFoto}}
             />
            <View style={styles.dataVacina}>
                <Text style={styles.rotulos}> Próxima vacinação </Text>
                <TouchableOpacity style={styles.btnCalender} onPress={() => setOpen(true)}>
                    <Text style={styles.inputDados}>{proximaData}</Text>
                    <Image 
                            style={styles.icone}
                            source={require('../images/calender.png')}
                    />
                </TouchableOpacity>                 
           </View>
           <TouchableOpacity style= {styles.containerLocation} > 
                <MapView 
                    onPress={(e) => getPressedLocation(e)}
                    loadingEnabled={true}
                        region={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.010,
                        longitudeDelta: 0.010
                        }} 
                        style={{flex:1, width: '100%'}} 
                    >
                        <Marker
                            coordinate={{latitude: latitude, longitude:longitude}}
                            pinColor={'#37BD6D'}
                            title={'Posição atual'}
                            
                        />
                </MapView>
            </TouchableOpacity> 
           <View style= {styles.containerCadastrar} >
                <TouchableOpacity style= {styles.cadastrar} onPress={novaVacina}>
                    <Text style= {styles.txtCadastrar}> Cadastrar </Text>         
                </TouchableOpacity>
                
           </View>     
           
        </View>  
    )
}

const styles = StyleSheet.create({
    containerLocation : {
        backgroundColor: 'blue',
        marginTop: '8%',
        height: '34.5%',
        width: '97%',
        marginBottom: -110,     
        flexDirection: "column",
        alignItems:"center", 
        borderRadius: 22,
    },
    container : {
       
        marginTop: 50,
        flex: 1, 
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection:"column", 
        
         
        
    },
    caixaDeDados: {
        marginBottom: 10,
        marginTop: 8,
       
        marginRight: 3,
        flexDirection: "row",
        alignContent:"center",
        
    },
    dataVacina: {
        marginBottom: 10,
        marginTop: 6,
        marginLeft: 10,
       
        flexDirection: "row",
        alignContent:"center",
        alignSelf: "flex-start",
    },
    selecionaImagem: {
        marginBottom: 10,
        marginTop: 15,
  
        marginRight: 3,
        flexDirection: "row",
        alignContent:"center",


    },

    rotulos: {
       
        fontFamily: 'AveriaLibre-Bold',
        color: 'white',
        marginRight: 8,
    },
    inputCalender: {
        
        backgroundColor: 'white',
        width: 160,
        height: 25,
        padding: 0,

    },
    inputDados : {
        flexDirection:"row",
        backgroundColor: 'white',
        width: 200,
        height: 24,
        padding: 3,
        color: '#3F92C5',   
        fontSize: 16,
        fontFamily: 'AveriaLibre-Bold',    
        
    },  
    radio:{
        marginLeft: 70,
        marginRight: 2,
    },
    imagem : {
        backgroundColor: '#419ED7',
        borderRadius: 4,
        elevation: 6,
    }, 
    textImagem: {
        color: 'white',
        fontFamily: 'AveriaLibre-Bold',
        margin: 4,
        
    },
    cadastrar : {
        marginTop: '35%',
        backgroundColor: '#37BD6D',     
        borderRadius: 2,
        elevation: 4, 
        
    },
    txtCadastrar : {
        color: 'white',
        fontFamily: 'AveriaLibre-Bold',
        paddingHorizontal: 20,
        paddingVertical: 8,

    },
    containerCadastrar: {
        flexDirection: "column",
        height: '100%',
    },
    icone : {
        width: 20, 
        height: 21, 
        backgroundColor: 'white', 
        position: "absolute",
        alignSelf: "center",
        marginLeft: 175,    
        opacity: 0.6,  
        
    },
    btnCalender : {
        flexDirection: "row",
        
        
    }
})

export default NovaVacina; 
