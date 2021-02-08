<script>
  export let jobs;

  $: applied = jobs.filter(job => job.dateApplied);
  $: replied = applied.filter(job => job.dateReplied);
  $: interviews = replied.filter(job => job.dateInterview);
  $: offers = interviews.filter(job => job.offer);
</script>

<p>{applied.length} Applications</p>
<p>{replied.length} Replies</p>
<p>{interviews.length} Interviews</p>
<p>{offers.length} Offers</p>