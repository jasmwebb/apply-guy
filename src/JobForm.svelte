<script>
  import { toggleAddForm, toggleEditForm } from "./stores";

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
    <div class="group">
      <label for="position">Position</label>
      <input type="text" id="position" bind:value={job.position} required />
    </div>

    <div class="group">
      <label for="company">Company</label>
      <input type="text" id="company" bind:value={job.company} />
    </div>
  </div>

  <div class="group">
    <label for="url">Link to Posting</label>
    <input type="text" id="url" bind:value={job.url} required />
  </div>

  <div>
    <div class="group">
      <label for="type">Employment Type</label>
      <select id="type" bind:value={job.type}>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Contract">Contract</option>
        <option value="Contract">Internship</option>
      </select>
    </div>

    <div class="group">
      <label for="datePosted">Date Position Posted</label>
      <input type="date" id="datePosted" bind:value={job.datePosted} />
    </div>
    
    <div class="group">
      <label for="dateApplied">Date Applied</label>
      <input type="date" id="dateApplied" bind:value={job.dateApplied} />
    </div>
  </div>

  {#if $toggleAddForm}
    <div class="form-btns">
      <button on:click={addJob}>
        Track Application
      </button>
      <button on:click={toggleAddForm.toggle}>Cancel</button>
    </div>
  {:else}
    <div>
      <div class="group">
        <label for="dateReplied">Date Reply Received</label>
        <input type="date" id="dateReplied" bind:value={job.dateReplied} />
      </div>

      <div class="group">
        <label for="dateInterview">Date of Interview</label>
        <input type="date" id="dateInterview" bind:value={job.dateInterview} />
      </div>
    </div>

    <label for="offer">
      <input type=checkbox id="offer" bind:checked={job.offer}>
      Got an offer!
    </label>
    
    <div class="form-btns">
      <button on:click={() => jobsRef.doc(job.id).update(job)}>Update Application</button>
      <button on:click={() => toggleEditForm.toggle({})}>Cancel</button>
      <button class="delete" on:click={deleteJob}>Delete</button>
    </div>
  {/if}
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    box-shadow: var(--b-shadow);
    border-radius: var(--br);
    margin: 1rem 0;
    padding: 1rem;
    background-color: rgb(var(--color-light));
  }

  form div {
    display: inherit;
    width: 100%;
    margin: 0.25rem auto;
  }

  div div.group:not(:first-child) {
    margin-left: 1rem;
  }

  .group {
    display: inherit;
    flex-direction: column;
    gap: 0.75rem;
  }

  button {
    border-radius: 100vw;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    padding: 0.2rem 1.25rem;
    width: fit-content;
  }

  .form-btns  {
    display: flex;
  }

  .form-btns button:first-of-type {
    margin-right: 1rem;
  }

  .delete {
    margin-left: auto;
    background-color: lightpink;
    border-color: lightcoral;
  }

  .delete:hover {
    background-color: lightcoral;
  }

  label {
    text-transform: uppercase;
    font-size: 0.75rem;
    font-weight: 600;
  }

  label[for="offer"] {
    margin-top: 0.75rem;
    font-size: 1rem;
  }
</style>