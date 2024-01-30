import { AlgorithmController, type AlgorithmReturn } from '$lib/AlgorithmController';

interface SortableElement {
	id: number;
	value: number;
	isSelected: boolean;
}

class BubbleSort extends AlgorithmController<SortableElement[]> {
	public comparisons: number = 0;
	public swaps: number = 0;

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
				el1.isSelected = el2.isSelected = true;
				if (el1.value > el2.value) {
					let tmp = el1.value;
					el1.value = el2.value;
					el2.value = tmp;
					swapped = true;
					this.swaps++;
					yield { status: `Swapped ${j} and ${j + 1}` };
				} else {
					yield { status: `Compared ${j} and ${j + 1} but didn't swap` };
				}
				el1.isSelected = el2.isSelected = false;
			}

			if (!swapped) break;
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
				isSelected: false
			};
		});

		return { max, min, arr: sortableArr };
	}
}

export default BubbleSort;
