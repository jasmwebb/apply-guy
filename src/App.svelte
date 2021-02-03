<script>
  import { FirebaseApp, User } from "sveltefire";

  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";

  import Dashboard from "./Dashboard.svelte";
  import Login from "./Login.svelte";

  let firebaseConfig = {
    apiKey: "AIzaSyDHQFL2SztGsENe3gLaISJN8cFtrKtA4v0",
    authDomain: "apply-guy.firebaseapp.com",
    projectId: "apply-guy",
    appId: "1:336464048821:web:0c5bf6687f99722ea804fc"
  };

  firebase.initializeApp(firebaseConfig);
</script>

<svelte:head>
  <title>Apply Guy</title>
</svelte:head>

<main>
  <!-- 1. 🔥 Firebase App -->
  <FirebaseApp {firebase}>
    <!-- 2. 😀 Get the current user -->
    <User persist={sessionStorage} let:user let:auth>
      <div slot="signed-out">
        <Login {auth} />
      </div>

      <Dashboard {user} {auth} />    
    </User>
  </FirebaseApp>
</main>

<footer>
  <a href="/">View source on GitHub</a>
  <p>Friendship ended with spreadsheets.</p>
  <p>Now ApplyGuy is my best friend.</p>
</footer>