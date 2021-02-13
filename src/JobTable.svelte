<script>
  import { toggleAddForm, toggleEditForm } from "./stores";
  import JobForm from "./JobForm.svelte";

  export let jobsRef;
  export let jobs;

  // https://svelte.dev/repl/08aca4e5d75e4ba7b8b05680f3d3bf7a?version=3.23.1
  let sortBy = {
    col: "dateApplied", 
    ascending: true
  };

  $: sortCol = (column) => {
    if (sortBy.col == column) {
      sortBy.ascending = !sortBy.ascending;
    } else {
      sortBy.col = column;
      sortBy.ascending = true;
    }

    let sortModifier = sortBy.ascending ? 1 : -1;

    let sortLogic = (a, b) => {
      if (a[column] < b[column]) {
        return -1 * sortModifier;
      } else if (a[column] > b[column]) {
        return 1 * sortModifier;
      } else {
        return 0
      }
    }

    jobs = jobs.sort(sortLogic);
  };
</script>

<table>
  <thead>
    <tr>
      <th on:click={sortCol("position")}>Position</th>
      <th on:click={sortCol("company")}>Company</th>
      <th on:click={sortCol("type")}>Type</th>
      <th on:click={sortCol("datePosted")}>Date Posted</th>
      <th on:click={sortCol("dateApplied")}>Date Applied</th>
      <th on:click={sortCol("dateReplied")}>Date Replied</th>
      <th on:click={sortCol("dateInterview")}>Date Interview</th>
      <th on:click={sortCol("offer")}>Offer</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {#each jobs as job}
      <tr>
        <td class="position">
          <a href={job.url} target="_blank">{job.position}</a>
        </td>
        <td>{job.company}</td>
        <td>{job.type}</td>
        <td>{job.datePosted}</td>
        <td>{job.dateApplied}</td>
        <td>{job.dateReplied ? job.dateReplied : ""}</td>
        <td>{job.dateInterview ? job.dateInterview : ""}</td>
        <td class="offer">{job.offer ? "✔" : "✖"}</td>
        <td>
          <button on:click={() => {
            if ($toggleAddForm) toggleAddForm.toggle();
            toggleEditForm.toggle(job);
          }}>
            Edit
          </button>
        </td>
      </tr>
      
      <div class:showEditForm="{$toggleEditForm === job}" id="overlay"></div>
      <div class:showEditForm="{$toggleEditForm === job}">
        <JobForm {jobsRef} {job} />
      </div>
    {/each}
  </tbody>
</table> 

<style>
  table {
    margin-top: 1rem;
    width: 100%;
    border-radius: var(--br);
    box-shadow: var(--b-shadow);
    overflow: hidden;
    border-collapse: collapse;
  }

  thead {
    background-color: rgba(var(--color-primary), 0.6);
  }

  th {
    padding: 0.5rem;
    border: none;
    text-transform: uppercase;
    font-size: 0.9rem;
    font-weight: 600;
  }

  tbody tr:nth-of-type(2n) {
    background-color: rgba(var(--color-primary), 0.2);
  }

  td {
    padding: 0.75rem;
  }

  .position a {
    color: rgb(var(--color-accent));
    font-weight: 600;
  }

  .offer {
    text-align: center;
    font-size: 1.25rem;
  }

  button {
    cursor: pointer;
    margin: 0;
    background-color: rgba(var(--color-primary), 0.6);
    border: 2px solid rgb(var(--color-primary));
    font-weight: 600;
    font-size: 0.9rem;
    text-transform: uppercase;
    box-shadow: var(--b-shadow);
    border-radius: 100vw;
    padding: 0.2rem 0.75rem;
  }

  button:hover {
    background-color: rgba(var(--color-primary), 0.8);
  }

  div {
    display: none;
  }

  #overlay {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(var(--color-dark), 0.15);
  }

  .showEditForm {
    display: block;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>