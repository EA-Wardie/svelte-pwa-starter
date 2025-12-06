<script lang="ts">
	let count: number = $state(0);
</script>

<section
	style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;"
>
	<h1>
		{count}
	</h1>
	<button onclick={(): number => count++}>Add Count</button>
</section>
