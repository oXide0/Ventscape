import { fireEvent, render } from '@testing-library/react';
import ImageUpload from 'components/ImageUpload';
import { TestWrapper } from 'utils/tests';
import { vi } from 'vitest';

describe('ImageUpload component', () => {
    const handleDragOver = vi.fn();
    const handleDrop = vi.fn();
    const onEventFileChange = vi.fn();
    const removeFile = vi.fn();
    it('renders correctly and triggers events', () => {
        const { getByTestId, getByText } = render(
            <TestWrapper>
                <ImageUpload
                    handleDragOver={handleDragOver}
                    handleDrop={handleDrop}
                    onEventFileChange={onEventFileChange}
                    removeFile={removeFile}
                    imgUrl={null}
                />
            </TestWrapper>
        );

        expect(getByText(/Cover photo/i)).toBeInTheDocument();
        fireEvent.change(getByTestId(/file-upload/i), {
            target: { files: [new File(['test-file'], 'test.png', { type: 'image/png' })] },
        });
        expect(onEventFileChange).toHaveBeenCalled();

        fireEvent.click(getByTestId(/file-upload/i));
        expect(handleDragOver).not.toHaveBeenCalled();
        expect(handleDrop).not.toHaveBeenCalled();
    });
});
