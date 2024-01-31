import { AlgorithmController, type AlgorithmReturn } from '$lib/AlgorithmController';

export enum ElementState {
    Default = 'DEFAULT',
    Complete = 'COMPLETE',
    Checking = 'CHECKING',
    Inserting = 'INSERTING'
}

interface SortableElement {
    id: number;
    value: number;
    state: ElementState;
}

class InsertionSort extends AlgorithmController<SortableElement[]> {
    public comparisons: number = 0;
    public swaps: number = 0;

    constructor(data: SortableElement[]) {
        super(data);

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

            const finalArr = InsertionSort.makeSortable(numArr).arr;
            this.data = finalArr;
        });
    }

    setup() {
        this.comparisons = 0;
        this.swaps = 0;
    }

    *algorithm(): AlgorithmReturn {
        const n = this.data.length;
        const arr = this.data;

        for (let i = 1; i < n; i++) {
            let key = arr[i];
            let j = i - 1;

            key.state = ElementState.Inserting;
            yield { status: `Moving ${key.value} into position` };
            //
            arr[j].state = ElementState.Checking;
            yield { status: `Comparing with ${arr[j].value}` };

            while (j >= 0 && arr[j].value > key.value) {
                const tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
                yield { status: `Swapped with ${2}` };
                arr[j + 1].state = ElementState.Default;

                yield { status: '' };

                j = j - 1;
                if (j >= 0) {
                    arr[j].state = ElementState.Checking;
                    yield { status: `Comparing with ${arr[j].value}` };
                }
            }

            key.state = ElementState.Default;
            arr[j + 1] = key;
            yield { status: `${key.value} in position` };
        }
    }

    static makeSortable(arr: number[]): { arr: SortableElement[]; min: number; max: number } {
        let max = -999999999999;
        let min = 999999999999;
        const sortableArr = arr.map((val, idx) => {
            if (val > max) max = val;
            if (val < min) min = val;
            return {
                id: idx,
                value: val,
                state: ElementState.Default
            };
        });

        return { max, min, arr: sortableArr };
    }
}

export default InsertionSort;
