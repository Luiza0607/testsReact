import { render, screen, cleanup } from '@testing-library/react';
import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';

const testCasesPLNToUSD = [
	{ amount: 100, format: 'PLN 100.00 = $28.57' },
	{ amount: 20, format: 'PLN 20.00 = $5.71' },
];

const testCasesUSDToPLN = [
	{ amount: 100, format: '$100.00 = PLN 350.00' },
	{ amount: 20, format: '$20.00 = PLN 70.00' },
];

describe('Component ResultBox', () => {
	it('should render without crashing', () => {
		render(<ResultBox from="PLN" to="USD" amount={100} />);
	});

	it('should render proper info about conversion when PLN -> USD', () => {

		for (const testObj of testCasesPLNToUSD) {

			// render component
			render(<ResultBox from="PLN" to="USD" amount={testObj.amount} />);

			// find “output” on screen and add component data-testid
			const output = screen.getByTestId('output');

			// check if div has good content and format (PLN 100.00 = $28.57)
			expect(output).toHaveTextContent(testObj.format);

			// unmount component
			cleanup();
		}
	});

	it('should render proper info about conversion when USD -> PLN', () => {

		for (const testObj of testCasesUSDToPLN) {

			// render component
			render(<ResultBox from="USD" to="PLN" amount={testObj.amount} />);

			// find “output” on screen and add component data-testid
			const output = screen.getByTestId('output');

			// check if div has good content and format (PLN 100.00 = $28.57)
			expect(output).toHaveTextContent(testObj.format);

			// unmount component
			cleanup();
		}
	});

	it('should render proper info about conversion when PLN -> PLN', () => {

		// render component
		render(<ResultBox from="PLN" to="PLN" amount={100} />);

		// find “output” on screen and add component data-testid
		const output = screen.getByTestId('output');

		// check that the values are not the same
		expect(output).toHaveTextContent('PLN 100.00 = PLN 100.00');

		// unmount component
		cleanup();
	});

	it('should render proper info about conversion when USD -> USD', () => {

		// render component
		render(<ResultBox from="USD" to="USD" amount={100} />);

		// find “output” on screen and add component data-testid
		const output = screen.getByTestId('output');

		// check that the values are not the same
		expect(output).toHaveTextContent('$100.00 = $100.00');

		// unmount component
		cleanup();
	});

	it('should render “Wrong value…” info about conversion when value are minus', () => {

		// render component
		render(<ResultBox from="PLN" to="USD" amount={-1} />);

		// find “output” on screen and add component data-testid
		const output = screen.getByTestId('output');

		// check that the values are minus
		expect(output).toHaveTextContent('Wrong value...');

		// unmount component
		cleanup();
	});

});