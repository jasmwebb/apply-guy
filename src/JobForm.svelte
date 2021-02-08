<script>
  export let jobsRef;
  export let job;
</script>

<form on:submit|preventDefault>
  <label for="position">Position</label>
  <input type="text" id="position" bind:value={job.position} required />

  <label for="company">Company</label>
  <input type="text" id="company" bind:value={job.company} />

  <label for="url">Link to Posting</label>
  <input type="text" id="url" bind:value={job.url} required />

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

  {#if Object.values(job).some(v => !v)}
    <button on:click={() => jobsRef.add(job)}>Track Application</button>
  {:else}
    <button on:click={() => jobsRef.doc(job.id).delete()}>Delete</button>
    <button on:click={() => jobsRef.doc(job.id).update(job)}>Update Application</button>
  {/if}
</form>