<script>
  import { Doc, Collection } from "sveltefire";

  export let user;
  export let auth;
</script>

<svelte:head>
  <title>Apply Guy - Dashboard</title>
</svelte:head>

<button on:click={() => auth.signOut()}>Log Out</button>

<!-- 3. 📜 Get a Firestore document owned by a user -->
<Doc path={`users/${user.uid}`} let:data={userData} let:ref={userRef} log>

  <h1>Hi, {userData.nickname}!</h1>

  <!-- 4. 💬 Get all the comments in its subcollection -->

  <h2>Jobs</h2>
  <Collection
    path={userRef.collection("jobs")}
    query={ref => ref.orderBy("dateApplied")}
    let:data={jobs}
    let:ref={jobsRef}
    log>

    {#if !jobs.length}
      <p>No jobs yet...</p>
    {/if}

    {#each jobs as job}
      <p>
        {job.position} @ {job.company}
        <button on:click={() => job.ref.delete()}>Delete</button>
      </p>
    {/each}


    <!-- <button
      on:click={() => jobsRef.add({
          text: '💬 Me too!',
          createdAt: Date.now()
        })}>
      Add job
    </button> -->

    <span slot="loading">Loading jobs...</span>

  </Collection>
</Doc>