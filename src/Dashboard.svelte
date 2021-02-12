<script>
  import { Doc, Collection } from "sveltefire";
  import { toggleAddForm, toggleEditForm } from "./stores";
  import JobForm from "./JobForm.svelte";
  import JobTable from "./JobTable.svelte";
  import StatsPanel from "./StatsPanel.svelte";

  export let user;
  export let auth;

  let nickname = "";

  function generateGreeting() {
    const greetings = ["Howdy,", "Hello there,", "Hiya,", "Wassup,", "Hey hey, it's", "We meet again,"];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
</script>

<Doc path={`users/${user.uid}`} let:data={userData} let:ref={userRef} let:error={err} log>
  <form slot="fallback" on:submit|preventDefault={() => userRef.set({ nickname: nickname })}>
    <label for="nickname">Hey! What's your name?</label>
    <input type="text" id="nickname" bind:value={nickname} />
    <button>Nice to meet you!</button>
  </form>
  
  <Collection
  path={userRef.collection("jobs")}
  query={ref => ref.orderBy("dateApplied")}
  let:data={jobs}
  let:ref={jobsRef}
  log>
  
  <section class="user-panel">
    <div class="details">
      <div>
        <h1>{generateGreeting()} {userData.nickname}!</h1>
        <button class="logout" on:click={() => auth.signOut()}>Log Out</button>
      </div>
      <StatsPanel {jobs} />
    </div>

      <button class="add" on:click={() => {
        if ($toggleEditForm) toggleEditForm.toggle({});
        toggleAddForm.toggle();
      }}>
        <svg class="icon line" width="18" height="18" id="plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <line x1="19" y1="12" x2="5" y2="12" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 3.5;"></line>
          <line x1="12" y1="5" x2="12" y2="19" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 3.5;"></line>
        </svg>
        App
      </button>
    </section>

    {#if $toggleAddForm}
      <JobForm {jobsRef} />
    {/if}

    
    {#if !jobs.length}
      <p>Not tracking any job applications yet...</p>
    {:else}
      <JobTable {jobsRef} {jobs} />  
    {/if}

    <span slot="loading">Loading jobs...</span>
  </Collection>
</Doc>

<style>
  .user-panel {
    display: flex;
    gap: 0.75rem;
  }
  
  .details {
    display: inherit;
    align-items: center;
    gap: 6rem;
    padding: 1rem 2rem;
    border-radius: var(--br);
    box-shadow: var(--b-shadow);
  }

  h1 {
    margin-bottom: 10px;
  }

  .logout {
    border-radius: 100vw;
    padding: 0.2rem 1.25rem;
  }

  .add {
    border-radius: 20px;
    width: 10ch;
    text-align: center;
  }

  .add svg {
    display: block;
    margin: auto;
    margin-bottom: 0.15rem;
  }
</style>