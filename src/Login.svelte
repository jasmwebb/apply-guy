<script>
  export let auth;

  let showRegister = false;
  let email = "";
  let password = "";
  let confirmPass = "";

  async function logIn() {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error.message);
    }
  }

  async function register() {
    if (password !== confirmPass) {
      alert("Passwords don't match. :(");
    } else {
      try {
        await auth.createUserWithEmailAndPassword(email, password);
      } catch (error) {
        alert(error.message);
      }
    }
  }
</script>

<h1>
  {showRegister ? "Register a New Account" : "Log In to Your Account"}
</h1>

<button class="action-btn demo-link" on:click={() => {
  email = "demo@demo.com";
  password = "demopassword";
  logIn();
}}>
  Or try out the demo!
</button>

<form on:submit|preventDefault>
  <input type="email" bind:value={email} id="email" placeholder="Email" required />
  <input type="password" bind:value={password} id="password" placeholder="Password" required />
  {#if showRegister}
    <input type="password" bind:value={confirmPass} id="confirmPass" placeholder="Confirm Password" required />
  {/if}

  <button type="button" class="action-btn register-link" on:click={() => showRegister = !showRegister}>
    {showRegister ? "Already have an account?" : "Need an account?"}
  </button>
  
  {#if showRegister}
    <button class="form-button" on:click={register}>Register</button>
  {:else}
    <button class="form-button" on:click={logIn}>Log In</button>
  {/if}
</form>

<style>
  h1 {
    text-align: center;
  }

  form {
    max-width: 50ch;
    margin: 0 auto;
  }

  form input {
    display: block;
    margin: 0;
    width: 100%;
  }

  .form-button {
    width: 100%;
    border-radius: 100vw;
  }

  .action-btn {
    display: block;
    width: fit-content;
    background-color: transparent;
    border: none;
    box-shadow: none;
    text-transform: none;
    text-align: right;
    color: rgb(var(--color-accent));
    padding: 1.5rem 0;
  }

  .action-btn:hover {
    color: rgb(var(--color-accent));
  }

  .action-btn:active {
    background-color: transparent;
  }

  .demo-link {
    margin: 0 auto;
    font-size: 1.1rem;
    padding-top: 0;
  }

  .register-link {
    margin-left: auto;
  }
</style>