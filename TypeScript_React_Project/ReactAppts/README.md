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