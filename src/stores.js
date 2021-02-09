import { writable } from "svelte/store";

function createAdd() {
  const { subscribe, update } = writable(false);

  return {
    subscribe,
    toggle: () => update(show => show = !show)
  }
}

function createEdit() {
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

  const { subscribe, update } = writable(resetForm());
  
  return {
    subscribe,
    toggle: (job) => update(form => form === job ? resetForm() : job)
  }
}

export const toggleAddForm = createAdd();
export const toggleEditForm = createEdit();