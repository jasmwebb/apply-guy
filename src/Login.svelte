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

<form on:submit|preventDefault>
  <label for="email">Email</label>
  <input type="email" bind:value={email} id="email" required />
  <label for="password">Password</label>
  <input type="password" bind:value={password} id="password" required />
  {#if showRegister}
    <label for="confirmPass">Confirm Password</label>
    <input type="password" bind:value={confirmPass} id="confirmPass" required />
  {/if}

  <p on:click={() => showRegister = !showRegister}>
    {showRegister ? "Already have an account?" : "Need an account?"}
  </p>
  
  {#if showRegister}
    <button on:click={register}>Sign Up</button>
  {:else}
    <button on:click={logIn}>Log In</button>
  {/if}
</form>