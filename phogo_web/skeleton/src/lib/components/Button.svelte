<script>
	/** @type {"gray" | "blue" | "green" | "yellow" | "red"} */
	export let color = 'gray';
	/** @type {"default" | "outline" | "subtle" | "filled" } */
	export let variant = 'default';

	// default CSS variables
	const VARS_INIT = {
		text: null,
		textHover: null,
		bd: null,
		bdHover: null,
		bg: null,
		bgHover: null,
		bgActive: null
	};
	$: vars = {};
	// variants
	$: {
		vars = VARS_INIT;
		if (color !== 'gray') {
			vars.text = `var(--text-${color}-500)`;
			vars.text = `var(--${color}11)`;
			vars.textHover = `var(--${color}12)`;
			vars.bgHover = `var(--${color}4)`;
			vars.bgActive = `var(--${color}5)`;
		}
		switch (variant) {
			case 'outline':
				vars.bd = `var(--${color}7)`;
				vars.bdHover = `var(--${color}8)`;
				break;
			case 'subtle':
				vars.bg = `var(--${color}3)`;
				break;
			case 'filled':
				vars = {
					...vars,
					text: `var(--bg)`,
					textHover: `var(--bg)`,
					bg: `var(--${color}9)`,
					bgHover: `var(--${color}10)`,
					bgActive: `var(--${color}11)`
				};
				break;
		}
	}
</script>

<button
	style:--btn-color={vars.text}
	style:--btn-color--hover={vars.textHover}
	style:--btn-bd={vars.bd}
	style:--btn-bg={vars.bg}
	style:--btn-bd--hover={vars.bdHover}
	style:--btn-bg--hover={vars.bgHover}
	style:--btn-bg--active={vars.bgActive}
	on:click
	{...$$restProps}
>
	<slot />
</button>

<style>
	button {
		padding: 0.6em 1em;
		font-weight: 600;
		color: var(--btn-color, var(--gray11));
		background-color: var(--btn-bg, var(--bg));
		border: 1px solid var(--btn-bd, transparent);
		border-radius: 4px;
		cursor: pointer;

		/* for buttons with icons */
		display: flex;
		gap: 0.6em;
		align-items: center;
	}
	button:hover {
		color: var(--btn-color--hover, var(--gray12));
		border-color: var(--btn-bd--hover, transparent);
		background-color: var(--btn-bg--hover, var(--gray4));
	}
	button:active {
		background-color: var(--btn-bg--active, var(--gray5));
	}
</style>
