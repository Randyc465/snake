import React, { useState } from 'react'
import { Image, Text, View, StyleSheet, TextInput, Button, ImageBackground, TouchableOpacity, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker';

//FIREBASE
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../config/Config';


import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';

const RegisterScreen = ({ navigation }: any) => {
  // ABRIR LA CAMARA
  const seleccionarImagen = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  ///SUBIR LA IMAGEN
  async function subirImagenC(nombre: string) {
    const storageRef = ref(storage, 'usuarios/' + nombre);

    try {
      const response = await fetch(imagen);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob, {
        contentType: 'image/jpg'
      });

      console.log('La imagen se subió con éxito');
      Alert.alert('Mensaje', 'Imagen subida con exito')

      // Obtiene la URL de la imagen
      const imageURL = await getDownloadURL(storageRef);
      console.log('URL de desacarga de la imagen', imageURL);

    } catch (error) {
      console.error(error);
    }
  }

  //subir imagen de galaria //

  const [imagen, setImagen] = useState(' ')

  //CARGAR IMAGEN
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  ///SUBIR IMAGEN
  async function subirImagen(nombre: string) {
    const storageRef = ref(storage, 'usuarios/' + nombre);

    try {
      const response = await fetch(imagen);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob, {
        contentType: 'image/jpg'
      });

      console.log('La imagen se subió con éxito');

      // Obtiene la URL de la imagen
      //const imageURL = await getDownloadURL(storageRef);
      //console.log('URL de desacarga de la imagen', imageURL);
    } catch (error) {
      console.log(error);
    }
  }


  ///////////////////////////////////////////

  const [correo, setcorreo] = useState('')
  const [contrasenia, setcontrasenia] = useState('')

  function registro() {
    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {

        const user = userCredential.user;
        navigation.navigate('login')
        navigation.navigate('login')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)

        switch (errorCode) {
          case 'auth/email-already-in-use':
            Alert.alert('Error', 'El correo ingresado ya esta en uso')
            break;

          // Agregue más casos según sea necesario

          default:
            Alert.alert('Error', 'Se ha producido un error desconocido')
            break;
        }
      });
  }

  return (
    <ImageBackground
      source={{ uri: 'https://iphoneswallpapers.com/wp-content/uploads/2022/04/Black-Snake-iPhone-Wallpaper.jpg' }}
      style={styles.container}
    >
      <Text style={[styles.titulo, { color: 'white' }]}>REGISTRO</Text>
      <Image
      source={{ uri: 'https://static.wikia.nocookie.net/es_wowpedia/images/b/b0/WotLKArthasPose.jpg/revision/latest?cb=20110225155850' }}
      style={{ width: 100, height: 100, marginTop: 0 }}
    />

      <TextInput
        style={[styles.input, { color: 'black' }]}
        placeholder="Nombre"
        onChangeText={(texto) => (texto)}
      />
      <TextInput
        style={[styles.input, { color: 'black' }]}
        placeholder="Apellido"
        onChangeText={(texto) => (texto)}
      />
      <TextInput
        style={[styles.input, { color: 'black' }]}
        placeholder="Edad"
        onChangeText={(texto) => (texto)}
      />
      <TextInput
        style={[styles.input, { color: 'black' }]}
        placeholder="Correo electrónico"
        onChangeText={(texto) => setcorreo(texto)}
      />
      <TextInput
        style={[styles.input, { color: 'black' }]}
        placeholder="Contraseña"
        onChangeText={(texto) => setcontrasenia(texto)}
      />
      <Text style={{ color: 'white' }}>SUBIR FOTO DE PERFIL </Text>
      <TouchableOpacity style={styles.but2} onPress={() => pickImage()}>
        <Text style={{ color: 'white' }}>Abrir almacenamiento</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.but2} onPress={() => subirImagen('avatar1')}>
        <Text style={{ color: 'white' }}>Guardar Imagen</Text>
      </TouchableOpacity>

      <Text style={{ color: 'white' }}>SUBIR IMAGEN DESDE LA CÁMARA</Text>
      <TouchableOpacity style={styles.but2} onPress={() => seleccionarImagen()}>
        <Text style={{ color: 'white' }}>Abrir cámara</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.but2} onPress={() => subirImagenC('avatar2')}>
        <Text style={{ color: 'white' }}>Subir imagen</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.but1, { }]} onPress={() => navigation.navigate('Ingreso')}>
        <Text style={{ color: 'white' }}>Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.but, {  }]} onPress={() => registro()}>
        <Text style={{ color: 'white' }}>Registrarse</Text>
      </TouchableOpacity>
    </ImageBackground>
  )
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 28,
    marginBottom: 10,
  },
  input: {

    height: 40,
    borderColor: 'gray', // Cambiamos el color del borde
    borderWidth: 5,
    borderRadius: 10,
    marginBottom: 1,
    padding: 7,
    width: '70%',
    backgroundColor: 'white',
    color: 'black', // Cambiamos el color del texto */
  },
  but: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: '40%',
    marginBottom: 5,
  },
  but2: {

    backgroundColor: '#286F93',
    padding: 5,
    borderRadius: 5,
    width: '60%',
    marginBottom: 10,
  },
  but1: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    width: '40%',
  },
  img: {
    width: 400,
    height: 300,
    resizeMode: 'contain'
  },


})

export default RegisterScreen