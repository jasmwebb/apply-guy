<script>
  export let jobs;

  $: applied = jobs.filter(job => job.dateApplied);
  $: replied = applied.filter(job => job.dateReplied);
  $: interviews = replied.filter(job => job.dateInterview);
  $: offers = interviews.filter(job => job.offer);
</script>

<div class="panel">
  <div class="apps">
    <p>{applied.length}</p>
    <p>Applications</p>
  </div>

  <div class="replies">
    <p>{replied.length}</p>
    <p>Replies</p>
  </div>
  
  <div class="interviews">
    <p>{interviews.length}</p>
    <p>Interviews</p>
  </div>
  
  <div class="offers">
    <p>{offers.length}</p>
    <p>Offers</p>
  </div>
</div>

<style>
  p {
    margin: 0;
    padding: 0;
    text-align: center;
    font-size: 0.8rem;
  }

  div p:first-of-type {
    font-size: 1.25rem;
    font-weight: 800;
    color: rgb(var(--color-primary));
    text-shadow: var(--t-shadow);
  }

  .panel {
    display: grid;
    grid-template-areas: 
      "apps replies"
      "inters offers";
    gap: 1.15rem;
    border-left: 1px solid rgba(var(--color-primary), 0.6);
    padding-left: 1.5rem;
  }

  .apps {
    grid-area: apps;
  }

  .replies {
    grid-area: replies;
  }

  .interviews {
    grid-area: inters;
  }

  .offers {
    grid-area: offers;
  }
</style>