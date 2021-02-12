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

<!-- https://getwaves.io/ -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 50 1440 150">
  <path class="wave" d="M0,192L60,181.3C120,171,240,149,360,128C480,107,600,85,720,96C840,107,960,149,1080,170.7C1200,192,1320,192,1380,192L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
</svg>

<!-- https://www.blobmaker.app/ -->
<!-- <svg class="blob" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
  <path fill="#FF0066" d="M46.9,-53.8C58.3,-46.3,63.3,-29.2,60,-15.4C56.8,-1.6,45.2,8.9,38.4,23.6C31.7,38.3,29.7,57.1,19.7,65.9C9.7,74.7,-8.3,73.4,-19.3,64.5C-30.3,55.5,-34.4,38.9,-45.4,24.1C-56.5,9.4,-74.4,-3.5,-73.4,-13.6C-72.3,-23.7,-52.3,-31,-36.9,-37.8C-21.5,-44.5,-10.7,-50.7,3.5,-54.8C17.8,-59,35.5,-61.2,46.9,-53.8Z" transform="translate(100 100)" />
</svg> -->

<main>
  <FirebaseApp {firebase}>
    <User persist={sessionStorage} let:user let:auth>
      <div slot="signed-out">
        <Login {auth}/>
      </div>

      <Dashboard {auth} {user} />    
    </User>
  </FirebaseApp>
</main>

<footer>
  <div class="source">
    <img src="/GitHub-Mark-32px.png" alt="GitHub Octocat Logo Mark">
    <a href="https://github.com/jasmwebb/apply-guy" target="_blank">View source on GitHub</a>
  </div>
  <p>Friendship ended with spreadsheets.</p>
  <p>Now ApplyGuy is my best friend.</p>
</footer>

<style>
  :global(:root) {
    --color-primary: 255,202,79; /* #FFCA4F */
    --color-accent: 95,105,200; /* #5F69C8 */
    --color-light: 255,255,255;
    --color-dark: 40,20,75; /* #28144B */
    --t-shadow: 0 1px 0.8px rgba(var(--color-dark), 0.7);
    --b-shadow: 0 1.5px 6px 0 rgba(var(--color-dark), 0.125);
    --br: 4px 20px 4px 20px;
  }

  :global(button) {
    margin: 0;
    background-color: rgba(var(--color-primary), 0.6);
    border: 2px solid rgb(var(--color-primary));
    font-weight: 600;
    font-size: 0.9rem;
    text-transform: uppercase;
    box-shadow: var(--b-shadow);
  }

  :global(button:hover) {
    cursor: pointer;
    background-color: rgba(var(--color-primary), 0.8);
  }

  .wave {
    fill: rgba(var(--color-primary), 0.8);
  }

  main {
    width: min(1024px, 90vw);
    margin: 0 auto;
  }

  footer {
    margin-top: 4rem;
    padding-bottom: 1rem;
    text-align: center;
    font-size: 0.9rem;
    line-height: 1;
  }

  footer p {
    margin: 0.5rem;
  }

  .source {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.75rem;
  }

  .source img {
    height: 1.25rem;
    margin-right: 0.5rem;
  }
</style>