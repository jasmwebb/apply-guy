<script>
  export let jobs;

  let applied = jobs.filter(job => job.dateApplied);
  let replied = applied.filter(job => job.dateReplied);
  let interviews = replied.filter(job => job.dateInterview);
  let offers = interviews.filter(job => job.offer);
</script>

<p>{applied.length} Applications</p>
<p>{replied.length} Replies</p>
<p>{interviews.length} Interviews</p>
<p>{offers.length} Offers</p>