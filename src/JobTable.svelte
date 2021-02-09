<script>
  import { toggleEditForm } from "./stores";
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
          <button on:click={() => toggleEditForm.toggle(job)}>
            Edit
          </button>
        </td>
      </tr>
      
      <aside class:showEditForm="{$toggleEditForm === job}">
        <JobForm {jobsRef} {job} />
      </aside>
    {/each}
  </tbody>
</table> 

<style>
  aside {
    display: none;
  }

  .showEditForm {
    display: block;
  }
</style>