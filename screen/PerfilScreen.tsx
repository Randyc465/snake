import { Button, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { db } from '../config/Config'
import { ref, onValue, update } from "firebase/database";
import { useEffect, useState } from 'react';
import { FlatList, TextInput } from 'react-native-gesture-handler';

export default function PerfilScreen() {
    const [nickName, setnickName] = useState('')
    const [correo, setcorreo] = useState('')
    const [contrasenia, setContrasenia] = useState('')
    const [edad, setedad] = useState('')
    const [datos, setDatos] = useState([])

    useEffect(() => {
        const starCountRef = ref(db, 'usuarios/' + nickName);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            const dataTemp: any = Object.keys(data).map((key) => ({
                key, ...data[key]
            }))
            setDatos(dataTemp)

        });
    }, [])

    function actulizar(nickName: string, correo: string, contrasenia: string, edad: string) {
        update(ref(db, 'usuarios/' + nickName), {
            contrasenia: contrasenia,
            edad: edad
        });
    }


    return (
        <ImageBackground
            source={{ uri: 'https://i.pinimg.com/564x/86/f7/2f/86f72f87cbd7050cbad3816c0dfff54a.jpg' }}
            style={styles.container}
        >
            <View>
                <TextInput
                    placeholder='NickName'
                    onChangeText={(texto) => setnickName(texto)}
                />
                <TextInput
                    placeholder='Contraseña'
                    onChangeText={(texto) => setContrasenia(texto)}
                />
                <TextInput
                    placeholder='Edad'
                    onChangeText={(texto) => setedad(texto)}
                />
                <Button title='Actualizar' onPress={() => actulizar(nickName, contrasenia, correo, edad)} color={'green'} />
                <View style={{ borderWidth: 1, width: "100%", marginTop: 10 }} />
                <FlatList
                    data={datos}
                    renderItem={({ item }) => (
                        <View>
                            <Text>nikeName:{item.nickName}</Text>
                            <Text>correo:{item.correo}</Text>
                            <Text>contraseña:{item.contrasenia}</Text>
                            <Text>edad:{item.edad}</Text>
                        </View>
                    )}
                />
            </View>
        </ImageBackground>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

