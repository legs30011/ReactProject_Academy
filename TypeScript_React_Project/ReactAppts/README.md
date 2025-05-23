# React + TypeScript + Vite
Linter de TypeScript:
npx eslint --init
####
   What do you want to lint? · javascript
  ✔ How would you like to use ESLint? · problems
  ✔ What type of modules does your project use? · esm
  ✔ Which framework does your project use? · react
  ✔ Does your project use TypeScript? · no / yes
  ✔ Where does your code run? · browser
  The config that you've selected requires the following dependencies:

  eslint, @eslint/js, globals, typescript-eslint, eslint-plugin-react
  ✔ Would you like to install them now? · No / Yes
  ✔ Which package manager do you want to use? · npm
  ☕️Installing...

###
  npm install todomvc-app-css
###
**Controlled Components:**

* **Use Cases:**
    * Implementing input validation as the user types.
    * Formatting input values in real-time (e.g., phone numbers, currency).
    * Synchronizing multiple related inputs.
    * Creating custom input components with specific behaviors.
    * When you need to have programmatic control over the input's value.
**Uncontrolled Components:**
* **Use Cases:**
    * Simple forms where you only need the input values on submit.
    * Integrating with third-party libraries that manage form state internally.
    * When you want to leverage the browser's built-in form handling for certain inputs (like file uploads).
    * Potentially slightly less re-renders for very large and complex forms where intermediate state updates might be performance-intensive (though this is often less of a concern with modern React).
**Summary:**
Choose **controlled components** when you need fine-grained control over the input's value and want to react to every change. Choose **uncontrolled components** for simpler scenarios where you only need the final value, or when integrating with systems that handle form state differently. Controlled components are generally preferred in most React applications for their predictability and easier implementation of complex logic.

**Props**
 First i define an interface UserCardProps to strongly type the props the component expects (name, age, and onClick).
  The UserCard functional component destructures these props.
  The name and age are displayed.
  When the div is clicked, the handleClick function is called, which in turn calls the onClick prop function and displays an alert.

**UserListFunctional**
I useState to manage the users array, the loading state, and any potential error.
useEffect replaces the lifecycle methods of a class component. The empty dependency array [] ensures that the fetchUsers function runs only once after the initial render, similar to componentDidMount.
async/await is used for a cleaner way to handle the asynchronous fetch operation compared to .then() and .catch().
We handle loading and error states to provide a better user experience.

**COUNTER**
Used useState to manage the count.
increment and decrement functions update the count. The decrement function optionally prevents the count from going below zero.
useEffect is used to add and remove the keydown event listener on the window.
Inside the effect, handleKeyDown checks for ArrowUp and ArrowDown keys and calls the respective increment/decrement functions.
The cleanup function (return () => { ... }) ensures that the event listener is removed when the component unmounts to prevent memory leaks.
onClick handlers are added to the buttons to trigger the increment and decrement functions.


# Extra uso de use de react

El Error:

El problema que teníamos era que el componente UserListWithUse, a pesar de usar React.cache en la función de fetch, estaba realizando múltiples peticiones a la API /users en cada re-render. Esto se evidenciaba en la pestaña de "Red" del navegador, donde veíamos una lista continua de peticiones exitosas (código de estado 200).

La Solución:

La solución fue mover la creación de la Promesa fuera del cuerpo del componente UserListWithUse. En lugar de llamar a la función de fetch (incluso la version cacheada) directamente dentro del componente, la llamamos una sola vez a nivel de módulo, creando una única instancia de la Promesa:

TypeScript

const usersPromise = fetchUsersCached(); // Esto se ejecuta solo una vez al cargar el módulo
Luego, dentro del componente UserListWithUse, simplemente usamos esta Promesa ya existente con React.use():

TypeScript

const users = React.use(usersPromise);
¿Por qué funcionó esto?

Al crear la Promesa fuera del componente, garantizamos que la misma instancia de la Promesa se utiliza en cada render del componente UserListWithUse. React.use() parece rastrear el estado de la Promesa que se le pasa. Si en cada render se le pasara una nueva instancia de Promesa (aunque la función de fetch subyacente estuviera cacheada y devolviera eventualmente el mismo resultado), React.use() podría interpretarlo como una nueva petición en curso y potencialmente volver a suspender o al menos no evitar la repetición de la petición inicial.

Al usar la misma instancia de Promesa, React.use() puede mantener el estado de esa petición a través de los re-renders del componente, evitando así las peticiones duplicadas.

¿Cómo funciona React.use() en español?

La función React.use() en React 19 es una nueva forma de "consumir" valores asíncronos (como Promesas) o el Contexto dentro de componentes funcionales. Piénsalo como una forma más directa e integrada de interactuar con estos valores en el flujo de renderizado.

Con Promesas: Cuando le pasas una Promesa a React.use(), React se encarga de manejar los diferentes estados de esa Promesa:

Pendiente (Pending): Si la Promesa aún no se ha resuelto, el componente se suspende. Esto significa que React puede pausar la renderización de esta parte del componente y mostrar una interfaz de carga (el fallback de un componente <Suspense> que lo envuelve).
Resuelta (Fulfilled): Una vez que la Promesa se resuelve, React.use() devuelve el valor resuelto. React entonces intenta renderizar de nuevo el componente con esta información.
Rechazada (Rejected): Si la Promesa falla, React.use() lanza el error. Este error debería ser capturado por un límite de error (error boundary).
En esencia, React.use() te permite leer el resultado de una Promesa directamente en tu componente funcional, haciendo que la lógica de carga y manejo de errores sea más declarativa y esté más integrada con el sistema de concurrencia de React.

Con Contexto: También puedes usar React.use(MiContexto) para leer el valor de un Contexto, de forma similar a useContext(MiContexto).

En nuestro caso, usamos React.use() para leer el resultado de la Promesa que devuelve la petición a la API. La clave para solucionar el problema de las múltiples peticiones fue asegurarnos de que siempre le estábamos pasando la misma instancia de la Promesa a React.use() en cada render del componente.