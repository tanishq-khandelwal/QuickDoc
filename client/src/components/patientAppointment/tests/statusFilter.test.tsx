import { render, screen, fireEvent } from '@testing-library/react';
import StatusFilter from '../statusFilter';

describe('StatusFilter Component', () => {
  const mockSetSelectedStatus = jest.fn();

  const renderComponent = (selectedStatus = 'all') => {
    render(
      <StatusFilter
        selectedStatus={selectedStatus}
        setSelectedStatus={mockSetSelectedStatus}
      />
    );
  };

  // Test Case 1: Renders the component with the correct label and options
  it('renders the component with the correct label and options', () => {
    renderComponent();

    // Check if the label is rendered
    expect(screen.getByText('Filter by Status:')).toBeInTheDocument();

    // Check if all options are rendered
    expect(screen.getByRole('option', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Pending' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Approved' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Rejected' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Completed' })).toBeInTheDocument();
  });

  // Test Case 2: Displays the selected status correctly
  it('displays the selected status correctly', () => {
    renderComponent('pending');
  
    // Check if the <select> element has the correct value
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveValue('pending');
  });

  // Test Case 3: Calls `setSelectedStatus` with the correct value when the dropdown changes
  it('calls `setSelectedStatus` with the correct value when the dropdown changes', () => {
    renderComponent();

    // Simulate changing the dropdown value to "approved"
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'approved' },
    });

    // Check if `setSelectedStatus` was called with "approved"
    expect(mockSetSelectedStatus).toHaveBeenCalledWith('approved');
  });
});