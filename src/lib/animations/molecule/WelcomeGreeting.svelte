<script lang="ts">
  export let greeting:string;
  export let className = '';
</script>
<div class={` ${className}`}>
<h2 class="text-center mt-12 mb-4 mx-4 mt-4 text-blue">{greeting}</h2>
</div>
