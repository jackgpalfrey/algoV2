import { swap } from '$lib/algoHelpers';
import { type AlgorithmReturn } from '$lib/algorithmControllers/AlgorithmController';

import { SortingAlgorithm } from '$lib/algorithmControllers/SortingAlgorithm';

export enum ElementState {
	Default = 'DEFAULT',
	Complete = 'COMPLETE',
	Checking = 'CHECKING'
}

class BubbleSort extends SortingAlgorithm<
	ElementState,
	{
		comparisons: number;
		swaps: number;
	}
> {
	protected defaultState: ElementState = ElementState.Default;

	setup() {
		this.data.comparisons = 0;
		this.data.swaps = 0;
	}

	*algorithm(): AlgorithmReturn {
		const arr = this.data.arr;
		let n = arr.length;

		let swapped: boolean;

		for (let i = 0; i < n - 1; i++) {
			swapped = false;
			for (let j = 0; j < n - i - 1; j++) {
				this.data.comparisons++;
                
				let el1 = arr[j];
				let el2 = arr[j + 1];

				el1.state = el2.state = ElementState.Checking;
				yield { status: `Comparing ${el1.value} and ${el2.value}` };

				if (el1.value > el2.value) {
					swap(arr, j, j + 1);
					swapped = true;
					this.data.swaps++;
					yield { status: `Swapped ${el2.value} and ${el1.value}` };
				} else {
					yield { status: 'No need to swap as already in correct order' };
				}

				el1.state = el2.state = ElementState.Default;
				yield { status: '' };
			}

			arr[n - i - 1].state = ElementState.Complete;
			yield { status: 'Final element now in correct place, onto next pass' };

			if (!swapped) break;
		}
		arr.forEach((el) => (el.state = ElementState.Complete));
	}
}

export default BubbleSort;
