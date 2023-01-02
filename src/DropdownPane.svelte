<div transition:slide="{{duration: 600}}" class={`${mq} dropdown-pane`}>
    <slot/>
</div>

<script>
    export let mq;

    function slide(node, { duration }) {
		return {
			duration,
			css: t => {
				const step = `${(mq == "phone" ? 12: 8 )*t}rem`;

				return `
					height: ${step};
                    padding: ${t}rem 1rem;
                    overflow: hidden;
                    `
			}
		};
    }

</script>

<style>
    .dropdown-pane {
        position: absolute;
        top: calc(3rem + 1px);
        right: 2rem;
        height: 8rem;
        width: 18rem;

        background-color: var(--dark);
        color: var(--light);
        border: 2px solid var(--blue);
        border-radius: 0 0 0.5rem 0.5rem;
        box-shadow: 6px 6px var(--black);
        padding: 1rem;

        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    .phone.dropdown-pane {
        height: 12rem;
        right: 0;
        width: calc(100% - 2rem - 4px);
    }
   
</style>