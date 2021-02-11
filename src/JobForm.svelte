<script>
  import { toggleAddForm } from "./stores";

  export let jobsRef;
  export let job = {};

  function addJob() {
    jobsRef.add(job);
    toggleAddForm.toggle();
  }

  function deleteJob() {
    let confirmDelete = confirm("Are you sure you want to delete this job?");

    if (confirmDelete) {
      jobsRef.doc(job.id).delete();
    }
  }
</script>

<form on:submit|preventDefault>
  <div>
    <label for="position">Position</label>
    <input type="text" id="position" bind:value={job.position} required />
  
    <label for="company">Company</label>
    <input type="text" id="company" bind:value={job.company} />
  </div>

  <div>
    <label for="url">Link to Posting</label>
    <input type="text" id="url" bind:value={job.url} required />
  </div>

  <div>
    <label for="type">Employment Type</label>
    <select id="type" bind:value={job.type}>
      <option value="Full-time">Full-time</option>
      <option value="Part-time">Part-time</option>
      <option value="Contract">Contract</option>
    </select>
    
    <label for="datePosted">Date Position Posted</label>
    <input type="date" id="datePosted" bind:value={job.datePosted} />
  
    <label for="dateApplied">Date Applied</label>
    <input type="date" id="dateApplied" bind:value={job.dateApplied} />
  </div>

  {#if $toggleAddForm}
    <button on:click={addJob}>
      Track Application
    </button>
  {:else}
    <label for="dateReplied">Date Reply Received</label>
    <input type="date" id="dateReplied" bind:value={job.dateReplied} />

    <label for="dateInterview">Date of Interview</label>
    <input type="date" id="dateInterview" bind:value={job.dateInterview} />

    <label for="offer">
      <input type=checkbox id="offer" bind:checked={job.offer}>
      Got an offer!
    </label>
    
    <button on:click={deleteJob}>Delete</button>
    <button on:click={() => jobsRef.doc(job.id).update(job)}>Update Application</button>
  {/if}
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
  }

  form div {
    width: 100%;
  }
</style>