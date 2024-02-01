import AlgorithmController from './AlgorithmController';

export interface SortableElement<ElementState> {
    id: number;
    value: number;
    state: ElementState;
}

interface SortAlgoData<ElementState> {
    arr: SortableElement<ElementState>[];
    arrMax: number;
    arrMin: number;
}

export class SortingAlgorithm<ElementState, ExtraData> extends AlgorithmController<
    SortAlgoData<ElementState> & ExtraData
> {
    protected defaultState: ElementState = 'DEFAULT' as ElementState;

    constructor(arr: number[]) {
        super({ arr: [], arrMax: -1, arrMin: -1 } as any);
        this.setArr(arr);

        this.setConfig('numbers', true);
        this.setConfig('barPos', 'center');

        this.register('numbers', () => {
            this.setConfig('numbers', !this.getConfig('numbers'));
        });

        this.register('load', (_, ...args: string[]) => {
            const numArr = [];

            for (let i = 0; i < args.length; i++) {
                let value = Number(args[i]);
                if (isNaN(value)) {
                    this.exec('status Invalid type');
                    return;
                }
                numArr.push(value);
            }

            this.setArr(numArr);
        });

        this.register(
            'rand',
            (
                _,
                countStr: string = '',
                minStr: string = '0',
                maxStr: string = '100',
                ...args: string[]
            ) => {
                let count = Number(countStr);
                let max = Number(maxStr);
                let min = Number(minStr);

                if (isNaN(count) || !Number.isInteger(count) || isNaN(max) || isNaN(min)) {
                    this.exec('status [count: int] <min: int> <max: int>');
                }

                max = Math.floor(max);
                min = Math.floor(min);

                let newArr: number[] = [];
                for (let i = 0; i < count; i++) {
                    let val = Math.round(Math.random() * (max - min)) + min;
                    newArr.push(val);
                }

                this.setArr(newArr);
            }
        );
    }

    setArr(arr: number[]) {
        let max = -999999999999;
        let min = 9999999999999;

        const sortableArr = arr.map((val, idx) => {
            if (val > max) max = val;
            if (val < min) min = val;
            return {
                id: idx,
                value: val,
                state: this.defaultState
            };
        });

        this.data.arr = sortableArr;
        this.data.arrMax = max;
        this.data.arrMin = min;
        this.restart();
    }
}
