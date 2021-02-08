<script>
  import { Doc, Collection } from "sveltefire";
  import JobForm from "./JobForm.svelte";
  import StatsPanel from "./StatsPanel.svelte";

  export let user;
  export let auth;

  function resetForm() {
    return {
      position: "",
      company: "",
      url: "",
      type: "Full-time",
      datePosted: "",
      dateApplied: ""
    }
  }

  let nickname = "";
  let showAddForm = false;
  let formContent = resetForm();

  const toggleForm = {
    add: () => showAddForm = !showAddForm,
    edit: (job) => {
      showAddForm = false;
      formContent = formContent === job ? resetForm() : job;
    }
  }
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

    {#if showAddForm}
      <button on:click={toggleForm.add}>X</button>
      <JobForm {jobsRef} job={formContent} {showAddForm} />
    {:else}
      <button on:click={toggleForm.add}>Add An Application</button>
    {/if}

    <StatsPanel {jobs} />

    {#if !jobs.length}
      <p>Not tracking any job applications yet...</p>
    {:else}
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Company</th>
            <th>Type</th>
            <th>Date Posted</th>
            <th>Date Applied</th>
            <th>Date Replied</th>
            <th>Date Interview</th>
            <th>Offer</th>
          </tr>
        </thead>
        <tbody>
          {#each jobs as job}
            <tr>
              <td>
                <a href={job.url} target="_blank">{job.position}</a>
              </td>
              <td>{job.company}</td>
              <td>{job.type}</td>
              <td>{job.datePosted}</td>
              <td>{job.dateApplied}</td>
              <td>{job.dateReplied ? job.dateReplied : ""}</td>
              <td>{job.dateInterview ? job.dateInterview : ""}</td>
              <td>{job.offer ? "Yes" : "No"}</td>
              <td>
                <button on:click={() => toggleForm.edit(job)}>
                  Edit
                </button>
              </td>
            </tr>
            
            <aside class:showEditForm="{formContent === job}">
              <JobForm {jobsRef} {job} />
            </aside>
          {/each}
        </tbody>
      </table>   
    {/if}

    <span slot="loading">Loading jobs...</span>
  </Collection>
</Doc>

<style>
  aside {
    display: none;
  }

  .showEditForm {
    display: block;
  }
</style>