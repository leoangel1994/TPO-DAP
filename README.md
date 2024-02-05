# TPO-DAP
## Desarrollo de Aplicaciones II - Universidad Argentina de la Empresa

### Integrantes del Grupo
- Ivo Andres Alani, LU #
- Pedro Moura, LU #1123499
- German Gilabert, LU#
- Leonardo Angel, LU#

## Instrucciones para Configurar y Ejecutar el Proyecto React Native

### Pasos Iniciales

1. **Instalar Node.js y npm:**
   - Descargar e instalar Node.js y npm desde [nodejs.org](https://nodejs.org/).

2. **Instalar React Native CLI:**
   - Ejecutar `npm install -g react-native-cli` para instalar la CLI de React Native.

### Configuración del Entorno Android

3. **Instalar Android Studio:**
   - Descargar e instalar Android Studio desde [developer.android.com](https://developer.android.com/studio).

4. **Configurar Variables de Entorno para Android SDK:**
   - Agregar las siguientes líneas al final de tu archivo de perfil (`~/.zprofile` o `~/.bash_profile`):
     ```bash
     export ANDROID_HOME=/ruta/a/tu/Android/Sdk
     export PATH=$PATH:$ANDROID_HOME/emulator
     export PATH=$PATH:$ANDROID_HOME/platform-tools
     ```
     Sustituir `/ruta/a/tu/Android/Sdk` con la ruta correcta a tu Android SDK.

   - Ejecutar `source ~/.zprofile` o `source ~/.bash_profile` para aplicar los cambios.

### Ejecutar la Aplicación React Native

5. **Clonar el Repositorio:**
   - Clonar este repositorio a tu máquina local.

6. **Instalar Dependencias:**
   - Navegar al directorio del proyecto y ejecutar `npm install` o `yarn install`.

7. **Ejecutar en el Emulador Android:**
   - Asegurarse de que el emulador Android esté iniciado.
   - Ejecutar `npx react-native run-android`.

   Si todo está configurado correctamente, deberías ver tu aplicación ejecutándose en el emulador.

---
