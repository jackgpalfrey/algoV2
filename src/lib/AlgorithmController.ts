export interface AlgorithmStatus {
    status: string;
}

export type AlgorithmReturn = Generator<AlgorithmStatus>;

export const completeStatus = { status: 'Complete' };

export class AlgorithmController<T> {
    public data: T;
    public algoInstance: AlgorithmReturn = undefined as any;
    public isComplete: boolean = undefined as any;
    private completeStatus: AlgorithmStatus = undefined as any;

    public constructor(data: T) {
        this.data = data;
        this.restart();
    }

    protected setup(): void { }

    protected *algorithm(): AlgorithmReturn {
        yield { status: 'Step 1' };
        yield { status: 'Step 2' };
        yield { status: 'Step 3' };
        yield { status: 'Step 4' };
        yield { status: 'Step 5' };
        return { status: 'Complete' };
    }

    public restart() {
        this.isComplete = false;
        this.completeStatus = { status: 'Complete' };

        this.setup();
        this.algoInstance = this.algorithm();
    }

    public step(): AlgorithmStatus {
        if (this.isComplete) return this.completeStatus;
        const { value, done } = this.algoInstance.next();
        if (done) {
            this.isComplete = true;
            if (value != undefined) this.completeStatus = value;
            return this.completeStatus;
        }
        return value;
    }
}

export default AlgorithmController;
