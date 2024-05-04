import Command from "../command.js";

export const clear = new Command()
	.setManual({
		purpose: "Clear terminal screen",
	})
	.setExecute(function(args, { pushHistory }) {
		pushHistory({
			clear: true,
			isInput: false
		});
	
		return { blank: true };
	});