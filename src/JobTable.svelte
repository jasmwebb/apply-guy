<script>
  import { toggleEditForm } from "./stores";
  import JobForm from "./JobForm.svelte";

  export let jobsRef;
  export let jobs;
</script>

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