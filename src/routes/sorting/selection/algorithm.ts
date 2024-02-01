import { swap } from '$lib/algoHelpers';
import { type AlgorithmReturn } from '$lib/algorithmControllers/AlgorithmController';
import { SortingAlgorithm } from '$lib/algorithmControllers/SortingAlgorithm';

export enum ElementState {
	Default = 'DEFAULT',
	Complete = 'COMPLETE',
	Checking = 'CHECKING',
	Inserting = 'INSERTING'
}

class SelectionSort extends SortingAlgorithm<ElementState, {}> {
	protected defaultState: ElementState = ElementState.Default;

	*algorithm(): AlgorithmReturn {
		const arr = this.data.arr;
		const n = arr.length;

		for (let i = 0; i < n - 1; i++) {
			let min_idx = i;
			arr[min_idx].state = ElementState.Inserting;
			for (let j = i + 1; j < n; j++) {
				arr[j].state = ElementState.Checking;
				yield { status: '' };
				if (arr[j].value < arr[min_idx].value) {
					arr[min_idx].state = ElementState.Default;
					min_idx = j;
					arr[min_idx].state = ElementState.Inserting;
					yield { status: '' };
				} else {
					arr[j].state = ElementState.Default;
				}
			}

			swap(arr, min_idx, i);
			arr[min_idx].state = ElementState.Default;
			arr[i].state = ElementState.Complete;
			yield { status: '' };
		}

		arr.forEach((el) => (el.state = ElementState.Complete));
	}
}

export default SelectionSort;
