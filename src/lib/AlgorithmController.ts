export interface AlgorithmStatus {
    status: string;
}

export type AlgorithmReturn = Generator<AlgorithmStatus>;

export const completeStatus = { status: 'Complete' };

type CommandRegisters = { [name: string]: (...args: string[]) => void };

export class AlgorithmController<T> {
    public data: T;
    public algoInstance: AlgorithmReturn = undefined as any;
    public isComplete: boolean = undefined as any;

    private completeStatus: AlgorithmStatus = undefined as any;
    private commandRegisters: CommandRegisters = {};
    public status: AlgorithmStatus = undefined as any;
    public onStep: () => void = () => { };

    public interval: number = 1000;
    public isRunning: boolean = undefined as any;
    public minimumInterval = 30;

    public constructor(data: T) {
        this.data = data;

        this.register('status', (_, ...args: string[]) => {
            this.status = { status: args.join(' ') };
        });

        this.register('clear', (..._: string[]) => {
            this.status = { status: '' };
        });

        this.register('step', (..._: string[]) => {
            this.step();
        });

        this.register('start', (..._: string[]) => {
            this.start();
        });

        this.register('stop', (..._: string[]) => {
            this.stop();
        });

        this.register('reset', (..._: string[]) => {
            this.restart();
        });

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

        this.restart();
    }

    protected setup(): void { }

    protected *algorithm(): AlgorithmReturn {
        return { status: 'No Algorithm Found' };
    }

    public restart() {
        this.isComplete = false;
        this.completeStatus = { status: 'Complete' };
        this.status = { status: 'Ready' };

        this.setup();
        this.algoInstance = this.algorithm();

        this.isRunning = false;
    }

    public step(): AlgorithmStatus {
        if (this.isComplete) return this.completeStatus;

        this.status = (() => {
            const { value, done } = this.algoInstance.next();
            if (done) {
                this.isComplete = true;
                this.stop()
                if (value != undefined) this.completeStatus = value;
                return this.completeStatus;
            }
            return value;
        })();

        this.onStep();
        return this.status;
    }

    public start() {
        this.isRunning = true;
        this.step();
        this.loopStep();
    }

    public stop() {
        this.isRunning = false;
    }

    public loopStep() {
        console.log("TICK")
        setTimeout(() => {
            if (!this.isRunning) return;
            this.step();
            this.loopStep();
        }, this.interval);
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
    }
}

export default AlgorithmController;
