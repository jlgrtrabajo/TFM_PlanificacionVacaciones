Cosas que me gustan en Pantalla portal del empleado:
--------------------- 
A la derecha se muestra usuario conectado y su Perfil. 
Botón cerrar sesión
La parte izquierda me gusta



---Sobre las 7 vulnerabilidades----
Sobre las 7 vulnerabilidades graves
Eso no impide que el proyecto funcione. Son advertencias de seguridad de dependencias.

Qué hacer con ellas
Ejecuta:

npm audit
Luego intenta:

npm audit fix --legacy-peer-deps
Si aún quedan vulnerabilidades graves, revisa en package.json las dependencias que puedan actualizarse a versiones nuevas y estables.