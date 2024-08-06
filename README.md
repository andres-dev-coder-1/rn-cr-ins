## Proyecto final React Native



#### Clonar el repo
```bash
git clone https://github.com/andres-dev-coder-1/rn-cr-ins.git

```

#### Instalar dependencias
```bash
cd rn-cr-ins
npm i
```

#### Iniciar la App
```bash
npm start
```

#### Bibliotecas necesarias

Versión de node usada: v22.5.1 (npm v10.8.2)

```
expo-image-picker
@react-native-firebase/app
@react-native-firebase/auth
@react-native-firebase/firestore
@react-native-firebase/storage
@reduxjs/toolkit@2.2.5
expo-sqlite@13.4.0
expo-location (con Api key de Google)
uuid
react-native-get-random-values  (necesario para poder usar uuid con Hermes, implementa crypto.getRandomValues)
```



#### Features:
Con YUP:
* validación login: email y contraseña 
* validación Signup: de password y confirmPassword en tiempo real (uno verifica al otro)

Con Redux Toolkit:
* Botón de volver atrás dinámico usando ele state: backButton.showBackButton


#### Imagenes de muestra:
![AltText](./img/2.%20lista-productos.png)