type CommandRegisters = { [name: string]: (...args: string[]) => void };

export interface AlgorithmStatus {
	status: string;
}

class CommandController {
	public status: AlgorithmStatus = undefined as any;
	private commandRegisters: CommandRegisters = {};

	public onUpdate: () => void = () => {};

	constructor() {
		this.register('status', (_, ...args: string[]) => {
			this.status = { status: args.join(' ') };
		});

		this.register('clear', (..._: string[]) => {
			this.status = { status: '' };
		});
	}

	public register(commandName: string, handler: (...args: string[]) => void) {
		this.commandRegisters[commandName] = handler;
	}

	public exec(input: string) {
		const splitInput = input.split(' ');
		const name = splitInput[0];
		const handler = this.commandRegisters[name];

		if (handler == undefined) {
			this.status = { status: `ERROR: Command '${name}' not found` };
			return;
		}

		this.commandRegisters[name](...splitInput);
        this.onUpdate()
	}
}

export default CommandController;
