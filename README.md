Clientes
========

Este programa permite al cliente conectar su dispositivo de adquisición de datos a VWL.


***
* [Componentes](#componentes)
* [Arquitectura](#arquitectura)
* [Plataformas](#plataformas)
  * [Windows](#windows)
  * [Mac OS X](#mac-os-x)
  * [Ubuntu Linux](#ubuntu-linux)
* [Uso](#uso)
  * [Descargas](#descargas)
  * [Compilar](#compilar)
    * [Windows](#windows)
    * [Mac OS X](#mac-os-x)
    * [Ubuntu Linux](#ubuntu-linux)
  * [Usando Electron](#usando-electron)
  * [Directo con NodeJS](#directo-con-nodejs)
  * [Ejemplo](#ejemplo)
    * [Ejemplo Con Arduino](#ejemplo-con-arduino)
    * [Ejemplo Con PLC](#ejemplo-con-plc)
    * [Trama](#trama)
* [Aclaraciones](#aclaraciones)

***

## Componentes

- Node JS -v4.4.5
- NPM
- Electron io

## Arquitectura

{Placa} -> [Serial] -> (PC) -> [Socket] -> (Servidor VWL)

Alternativa

{PLC} -> [Socket] -> (Servidor VWL)

## Plataformas

#### Windows

```
# Win
# Proyecto VWL Modo Cliente
  git clone https://github.com/virtualweblab/clientes.git
# Instalacion de paquetes
  npm install
```

#### Mac OS X
```
# Mac
# Proyecto VWL Modo Cliente
  git clone https://github.com/virtualweblab/clientes.git
# Instalacion de paquetes
  npm install
```
#### Ubuntu Linux
```
# Ubuntu
# Proyecto VWL Modo Cliente
  git clone https://github.com/virtualweblab/clientes.git
# Instalacion de paquetes
  npm install
```
## uso

#### Descargas

#### Compilar

Para descargar la aplicacion y compilar segun sea su sistema operativo

##### Windows

64 Bits
```
electron-packager . vwl --platform=win32 --arch=x64
```
32 Bits
```
electron-packager . vwl --platform=win32 --arch=x32
```
##### Mac OS X
```
electron-packager . vwl --platform=darwin --arch=x64
```
##### Ubuntu Linux
```
electron-packager . vwl --platform=darwin --arch=x64
```

#### Usando Electron
```
npm start
```
#### Directo con NodeJS

```
# Arrancar aplicación
node serial.js [-- shield] [--socket]
```

#### Ejemplo Con Arduino

Para Arduino
```
node app.js 'arduino' 'SOCKET_1'
```
#### Ejemplo Con PLC
Para PLC
```
node app.js 'plc' 'SOCKET_2'
```

#### Trama

```
{
  E:{           // Estado de las entradas digitales [estados binarios]
    I1  : 1,    // Estado de la entrada 1 -> [pin 12]
    I2  : 0,    // Estado de la entrada 2 -> [pin 11]
    ... : ..,
    ... : ..,
    ... : ..,
    I[n]: ..    // Estado de la entrada n -> [pin "n"]
   },
   S:{          // Estado de las salidas digitales [estados binarios]
    Q1  : 0,    // Estado de la salida 1 -> [pin 2]
    Q2  : 1,
    ... : ..,
    ... : ..,
    ... : ..,
    Q[n]: ..    // Estado de la salida n -> [pin "n"]
   },
   IA:{         // Estado de las entradas analogas [estados 0-1024]
    IA1 : 444,  // Estado de la entrada analoga 1 -> [pin A0]
    IA2 : 0.00,
    ... : ..,
    ... : ..,
    ... : ..,
    IA[n]: ..   // Estado de la entrada analoga n -> [pin "n"]
   }
}& // Indicador de fin de trama
```
## Aclaraciones

- Para cualquier error por favor consultar o informar a: https://github.com/virtualweblab/clientes/issues
