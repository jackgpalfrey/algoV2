import { AlgorithmController, type AlgorithmReturn } from '$lib/AlgorithmController';

export enum ElementState {
	Default = 'DEFAULT',
	Complete = 'COMPLETE',
	Checking = 'CHECKING'
}

interface SortableElement {
	id: number;
	value: number;
	state: ElementState;
}

class BubbleSort extends AlgorithmController<SortableElement[]> {
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

			const finalArr = BubbleSort.makeSortable(numArr).arr;
			this.data = finalArr;
		});
	}

	setup() {
		this.comparisons = 0;
		this.swaps = 0;
	}

	*algorithm(): AlgorithmReturn {
		let n = this.data.length;
		let swapped: boolean;

		for (let i = 0; i < n - 1; i++) {
			swapped = false;
			for (let j = 0; j < n - i - 1; j++) {
				this.comparisons++;
				let el1 = this.data[j];
				let el2 = this.data[j + 1];
				el1.state = el2.state = ElementState.Checking;
				yield { status: `Comparing ${el1.value} and ${el2.value}` };
				if (el1.value > el2.value) {
					let tmp = el1.value;
					el1.value = el2.value;
					el2.value = tmp;
					swapped = true;
					this.swaps++;
					yield { status: `Swapped ${el2.value} and ${el1.value}` };
				} else {
					yield { status: 'No need to swap as already in correct order' };
				}

				el1.state = el2.state = ElementState.Default;
				yield { status: '' };
			}

			this.data[n - i - 1].state = ElementState.Complete;
			yield { status: 'Final element now in correct place, onto next pass' };

			if (!swapped) break;
		}
		this.data[0].state = ElementState.Complete;
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

export default BubbleSort;
