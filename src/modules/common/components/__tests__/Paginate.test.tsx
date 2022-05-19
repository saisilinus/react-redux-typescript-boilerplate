import React from 'react';
import { render, screen } from '../../../../__mocks__/utils';
import { Paginate } from '..';
import { queryResult, mockPagination } from '../../../../__mocks__/data';

const itemsPerPage = 1;
const onPageClick = jest.fn();

describe('Paginate', () => {
  it('renders correctly', async () => {
    render(
      <div>
        <Paginate currentPage={1} onPageClick={onPageClick} totalPages={queryResult.results.length / itemsPerPage}>
          {mockPagination(1, itemsPerPage).map((item) => (
            <h1 key={item.id}>{item.name}</h1>
          ))}
        </Paginate>
      </div>
    );

    expect(screen.getByText(/John Paul/i)).toBeInTheDocument();
    expect(screen.queryByText(/John Smith/i)).not.toBeInTheDocument();
  });

  it('renders item on correct page', async () => {
    render(
      <div>
        <Paginate currentPage={2} onPageClick={onPageClick} totalPages={queryResult.results.length / itemsPerPage}>
          {mockPagination(2, itemsPerPage).map((item) => (
            <h1 key={item.id}>{item.name}</h1>
          ))}
        </Paginate>
      </div>
    );

    expect(screen.getByText(/John Smith/i)).toBeInTheDocument();
    expect(screen.queryByText(/John Paul/i)).not.toBeInTheDocument();
  });

  test('first button works', async () => {
    const { user } = render(
      <div>
        <Paginate currentPage={2} onPageClick={onPageClick} totalPages={queryResult.results.length / itemsPerPage}>
          {mockPagination(2, itemsPerPage).map((item) => (
            <h1 key={item.id}>{item.name}</h1>
          ))}
        </Paginate>
      </div>
    );

    await user.click(screen.getByRole('button', { name: 'First' }));
    expect(onPageClick).toBeCalledWith(1);
  });

  test('previous button works', async () => {
    const { user } = render(
      <div>
        <Paginate currentPage={2} onPageClick={onPageClick} totalPages={queryResult.results.length / itemsPerPage}>
          {mockPagination(2, itemsPerPage).map((item) => (
            <h1 key={item.id}>{item.name}</h1>
          ))}
        </Paginate>
      </div>
    );

    await user.click(screen.getByRole('button', { name: 'Previous' }));
    expect(onPageClick).toBeCalledWith(1);
  });

  test('numbered buttons work', async () => {
    const { user } = render(
      <div>
        <Paginate currentPage={2} onPageClick={onPageClick} totalPages={queryResult.results.length / itemsPerPage}>
          {mockPagination(2, itemsPerPage).map((item) => (
            <h1 key={item.id}>{item.name}</h1>
          ))}
        </Paginate>
      </div>
    );

    await user.click(screen.getByRole('button', { name: '5' }));
    expect(onPageClick).toBeCalledWith(5);
  });

  test('next button works', async () => {
    const { user } = render(
      <div>
        <Paginate currentPage={2} onPageClick={onPageClick} totalPages={queryResult.results.length / itemsPerPage}>
          {mockPagination(2, itemsPerPage).map((item) => (
            <h1 key={item.id}>{item.name}</h1>
          ))}
        </Paginate>
      </div>
    );

    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(onPageClick).toBeCalledWith(3);
  });

  test('last button works', async () => {
    const { user } = render(
      <div>
        <Paginate currentPage={2} onPageClick={onPageClick} totalPages={queryResult.results.length / itemsPerPage}>
          {mockPagination(2, itemsPerPage).map((item) => (
            <h1 key={item.id}>{item.name}</h1>
          ))}
        </Paginate>
      </div>
    );

    await user.click(screen.getByRole('button', { name: 'Last' }));
    expect(onPageClick).toBeCalledWith(5);
  });

  test('current button doesn"t trigger onPageClick', async () => {
    const { user } = render(
      <div>
        <Paginate currentPage={2} onPageClick={onPageClick} totalPages={queryResult.results.length / itemsPerPage}>
          {mockPagination(2, itemsPerPage).map((item) => (
            <h1 key={item.id}>{item.name}</h1>
          ))}
        </Paginate>
      </div>
    );

    await user.click(screen.getByText('2'));
    expect(onPageClick).not.toBeCalled();
  });
});
