import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import SingleUserRow from './SingleUserRow';
import { useGetUsersQuery } from './users.api';
import Paginate from '../common/pagination/Paginate';

const UserList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  //   const [limit, setLimit] = useState<number>(10);
  const limit = 5;
  const { data } = useGetUsersQuery({ page: currentPage, limit });

  const onPageClicked = (page: number) => {
    setCurrentPage(page);
  };

  if (!data) {
    return <div className="d-flex flex-column justify-content-center align-items-center">No Users</div>;
  }

  return (
    <Paginate currentPage={currentPage} totalPages={data.totalPages} onPageClick={onPageClicked}>
      <div>
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">Name</th>
              <th className="border-bottom">Role</th>
              <th className="border-bottom">Verified</th>
              <th className="border-bottom">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.results.map((user) => (
              <SingleUserRow user={user} key={user.id} />
            ))}
          </tbody>
        </Table>
      </div>
    </Paginate>
  );
};

export default UserList;
