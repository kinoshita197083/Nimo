import NotFound from "../pages/NotFound"
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('NotFound Component', () => {
    it('should render the "404" text', () => {
        render(<NotFound />);

        expect(screen.getByText('404')).toBeInTheDocument();
    });

    it('should render the "Results Not Found" text', () => {
        render(<NotFound />);

        expect(screen.getByText('Results Not Found')).toBeInTheDocument();
    });
});





