import CommandController, { type AlgorithmStatus } from './CommandController';

export type AlgorithmReturn = Generator<AlgorithmStatus>;

export const completeStatus = { status: 'Complete' };

export enum AlgorithmState {
	Ready = 'READY',
	Started = 'STARTED',
	Running = 'RUNNING',
	Complete = 'COMPLETE'
}

export class AlgorithmController<Data> extends CommandController {
	public data: Data;
	public config: { [key: string]: any } = {};

	public algoInstance: AlgorithmReturn = undefined as any;
	public state: AlgorithmState = undefined as any;

	private completeStatus: AlgorithmStatus = undefined as any;

	public onStep: () => void = () => {};

	public interval: number = 1000;
	public minimumInterval = 0;

	public constructor(data: Data) {
		super();

		this.data = data;
		this.restart();

		this.register('step', (..._: string[]) => this.step());
		this.register('start', (..._: string[]) => this.start());
		this.register('stop', (..._: string[]) => this.stop());
		this.register('toggleStart', (..._: string[]) => {
			if (this.state === AlgorithmState.Running) this.stop();
			else this.start();
		});
		this.register('reset', (..._: string[]) => this.restart());
		this.register('interval', (_, ...args: string[]) => {
			if (args.length > 1) {
				this.exec('status Usage: interval <timeInMS: int>');
			} else if (args.length === 0) {
				this.exec(`status ${this.interval}ms`);
			} else if (args.length === 1) {
				let value = Number(args[0]);

				if (isNaN(value)) {
					this.exec('status Usage: interval <timeInMS: int>');
				} else if (value < this.minimumInterval) {
					this.exec(`status Interval must be greater than ${this.minimumInterval}`);
				} else {
					this.interval = value;
					this.exec(`status Set interval to ${value}ms`);
				}
			}
		});
	}

	public setConfig(key: string, value: any) {
		this.config[key] = value;
	}

	public getConfig(key: string): any {
		return this.config[key];
	}

	protected setup(): void {}
	protected *algorithm(): AlgorithmReturn {}

	public restart() {
		this.completeStatus = { status: 'Complete' };
		this.status = { status: 'Ready' };

		this.setup();
		this.algoInstance = this.algorithm();

		this.state = AlgorithmState.Ready;
	}

	public step(): AlgorithmStatus {
		if (this.state == AlgorithmState.Complete) return this.completeStatus;
		if (this.state == AlgorithmState.Ready) this.state = AlgorithmState.Started;

		const { value, done } = this.algoInstance.next();
		if (done) {
			this.state = AlgorithmState.Complete;
			if (value != undefined) this.completeStatus = value;
			this.status = this.completeStatus;
		} else {
			this.status = value;
		}

		console.log(this.data);
		this.onStep();
		this.onUpdate();
		return this.status;
	}

	public start() {
		this.state = AlgorithmState.Running;
		this.loopStep();
	}

	public stop() {
		this.state = AlgorithmState.Started;
	}

	public loopStep(): void {
		if (this.state != AlgorithmState.Running) return;
		this.step();

		// Arrow func required for the this binding
		setTimeout(() => this.loopStep(), this.interval);
	}
}

export default AlgorithmController;
