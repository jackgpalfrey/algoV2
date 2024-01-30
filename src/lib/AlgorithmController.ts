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

    public constructor(data: T) {
        this.data = data;

        this.register('status', (_, ...args: string[]) => {
            this.status = { status: args.join(' ') };
        });

        this.register('step', (..._: string[]) => {
            this.step();
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
    }

    public step(): AlgorithmStatus {
        this.status = (() => {
            if (this.isComplete) return this.completeStatus;
            const { value, done } = this.algoInstance.next();
            if (done) {
                this.isComplete = true;
                if (value != undefined) this.completeStatus = value;
                return this.completeStatus;
            }
            return value;
        })();
    
        this.onStep()
        return this.status;
    }

    public register(commandName: string, handler: (...args: string[]) => void) {
        this.commandRegisters[commandName] = handler;
    }

    public exec(input: string) {
        const splitInput = input.split(' ');
        const name = splitInput[0];
        const handler = this.commandRegisters[name]

        if (handler == undefined){
            this.status = { status: `ERROR: Command '${name}' not found` }
            return
        }

        this.commandRegisters[name](...splitInput);
    }
}

export default AlgorithmController;
