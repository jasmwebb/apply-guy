<script>
  import { Doc, Collection } from "sveltefire";
  import { toggleAddForm } from "./stores";
  import JobForm from "./JobForm.svelte";
  import JobTable from "./JobTable.svelte";
  import StatsPanel from "./StatsPanel.svelte";

  export let user;
  export let auth;

  let nickname = "";
</script>

<button on:click={() => auth.signOut()}>Log Out</button>

<Doc path={`users/${user.uid}`} let:data={userData} let:ref={userRef} let:error={err} log>
  <form slot="fallback" on:submit|preventDefault={() => userRef.set({ nickname: nickname })}>
    <label for="nickname">Hey! What's your name?</label>
    <input type="text" id="nickname" bind:value={nickname} />
    <button>Nice to meet you!</button>
  </form>

  <h1>Howdy, {userData.nickname}!</h1>

  <Collection
    path={userRef.collection("jobs")}
    query={ref => ref.orderBy("dateApplied")}
    let:data={jobs}
    let:ref={jobsRef}
    log>

    {#if $toggleAddForm}
      <button on:click={toggleAddForm.toggle}>X</button>
      <JobForm {jobsRef} />
    {:else}
      <button on:click={toggleAddForm.toggle}>Add An Application</button>
    {/if}

    <StatsPanel {jobs} />

    {#if !jobs.length}
      <p>Not tracking any job applications yet...</p>
    {:else}
      <JobTable {jobsRef} {jobs} />  
    {/if}

    <span slot="loading">Loading jobs...</span>
  </Collection>
</Doc>