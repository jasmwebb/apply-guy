<script>
  export let jobsRef;

  let newJob = {
    position: "",
    company: "",
    url: "",
    type: "Full-time",
    datePosted: null,
    dateApplied: null
  };
</script>

<form on:submit|preventDefault>
  <label for="position">Position</label>
  <input type="text" id="position" bind:value={newJob.position} required />

  <label for="company">Company</label>
  <input type="text" id="company" bind:value={newJob.company} />

  <label for="url">Link to Posting</label>
  <input type="text" id="url" bind:value={newJob.url} />

  <label for="type">Employment Type</label>
  <select id="type" bind:value={newJob.type}>
    <option value="Full-time">Full-time</option>
    <option value="Part-time">Part-time</option>
    <option value="Contract">Contract</option>
  </select>
  
  <label for="datePosted">Date Position Posted</label>
  <input type="date" id="datePosted" bind:value={newJob.datePosted} />

  <label for="dateApplied">Date Applied</label>
  <input type="date" id="dateApplied" bind:value={newJob.dateApplied} required />

  <button on:click={() => jobsRef.add(newJob)}>Track Application</button>
</form>