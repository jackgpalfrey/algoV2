import { type AlgorithmReturn } from '$lib/algorithmControllers/AlgorithmController';
import { SortingAlgorithm } from '$lib/algorithmControllers/SortingAlgorithm';

export enum ElementState {
	Default = 'DEFAULT',
	Complete = 'COMPLETE',
	Checking = 'CHECKING',
	Inserting = 'INSERTING'
}

class InsertionSort extends SortingAlgorithm<ElementState, {}> {
	protected defaultState: ElementState = ElementState.Default;

	*algorithm(): AlgorithmReturn {
		const arr = this.data.arr;
		const n = arr.length;

		for (let i = 1; i < n; i++) {
			let key = arr[i];
			let j = i - 1;

			key.state = ElementState.Inserting;
			yield { status: `Moving ${key.value} into position` };

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
		arr.forEach((el) => (el.state = ElementState.Complete));
	}
}

export default InsertionSort;
