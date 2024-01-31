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
		super([]);
		this.setArr(arr);

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
	}
}
