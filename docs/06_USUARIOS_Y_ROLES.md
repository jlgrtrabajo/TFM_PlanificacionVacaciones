# Usuarios, perfiles y departamentos

## 1. Perfiles

### Usuario

Representa a un empleado.

Puede:

- Consultar su planificación.
- Crear una planificación.
- Enviarla.
- Consultar su estado.
- Consultar un rechazo.
- Crear una nueva planificación después de un rechazo.

### AdminPlanifVacac

Representa al administrador de planificación.

Puede:

- Acceder a la administración.
- Consultar planificaciones.
- Filtrar.
- Analizar coincidencias.
- Aprobar.
- Rechazar.
- Introducir motivos.

## 2. Usuarios mock

Se deben incluir como mínimo:

| ID | Nombre | Perfil |
|---:|---|---|
| 1 | Juan | Usuario |
| 2 | Pedro | Usuario |
| 3 | Silvia | Usuario |
| 4 | Ernesto | Usuario |
| 5 | Isabel | Usuario |
| 6 | Melissa | Usuario |
| 7 | Eva | Usuario |
| 8 | Ana | Usuario |
| 9 | Iris | Usuario |
| 10 | Sonia | Usuario |
| 11 | Dani | AdminPlanifVacac |
| 12 | Alberto | AdminPlanifVacac |
| 13 | Alex | AdminPlanifVacac |

Estos usuarios proceden del modelo de datos proporcionado.

## 3. Departamentos

El modelo proporcionado contempla:

1. RRHH
2. Informatica
3. Ventas
4. Compras
5. Contabilidad

Los usuarios mock deben distribuirse entre estos departamentos de forma que el prototipo pueda demostrar la relación departamento/aprobador.

## 4. Aprobadores

Los administradores Dani, Alberto y Alex deben asignarse a departamentos mediante los datos mock.

La aplicación no debe utilizar la tabla `RelacionUserAprobadorUsers`.

## 5. Login

El login es únicamente demostrativo.

No existe seguridad real.

Para facilitar las pruebas, se pueden proporcionar usuarios seleccionables o credenciales mock claramente documentadas.
