import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, Col, Dropdown, InputGroup, Row, Table } from 'react-bootstrap';
import { faCheck, faPlus, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RangeSlider from 'react-bootstrap-range-slider';
import SingleUserRow from './SingleUserRow';
import { useGetUsersQuery } from './users.api';
import Paginate from '../common/components/Paginate';
import routes from '../common/routing/routes';
import Loader from '../common/components/Loader';
import Animate from '../common/components/Animate';

const LimitItem = ({ limit, currentLimit, onClick }: { limit: number; currentLimit: number; onClick: () => void }) => (
  <Dropdown.Item className="fw-bold" onClick={onClick}>
    <div className="d-flex justify-content-between">
      {limit}
      {currentLimit === limit && (
        <span className="icon icon-small ms-auto">
          <FontAwesomeIcon icon={faCheck} />
        </span>
      )}
    </div>
  </Dropdown.Item>
);

const UserList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentLimit, setCurrentLimit] = useState<number>(10);
  const { data, isLoading, isFetching } = useGetUsersQuery({ page: currentPage, limit: currentLimit });

  const onPageClicked = (page: number) => {
    setCurrentPage(page);
  };

  if (!data) {
    return <div className="d-flex flex-column justify-content-center align-items-center">No Users</div>;
  }

  return (
    <>
      <Loader show={isLoading || isFetching} />
      <div className="d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="mb-2 mb-lg-0">
          <h4>Users List</h4>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Button variant="primary" size="sm" onClick={() => navigate(routes.NewUser.relativePath)}>
            <FontAwesomeIcon icon={faPlus} className="me-2" /> Add New User
          </Button>
        </div>
      </div>
      <div className="table-settings mb-4">
        <Row className="justify-content-end align-items-center">
          <Col xs={3} lg={8} className="text-end">
            <Dropdown as={ButtonGroup} className="me-2">
              <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0">
                <span className="icon icon-sm icon-gray">
                  <FontAwesomeIcon icon={faSlidersH} />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-right px-2">
                <Dropdown.Item className="fw-bold text-dark">Show</Dropdown.Item>
                <LimitItem limit={10} currentLimit={currentLimit} onClick={() => setCurrentLimit(10)} />
                <LimitItem limit={20} currentLimit={currentLimit} onClick={() => setCurrentLimit(20)} />
                <LimitItem limit={30} currentLimit={currentLimit} onClick={() => setCurrentLimit(30)} />
                <Dropdown.Divider />
                <Dropdown.Item className="fw-bold text-dark">Custom</Dropdown.Item>
                <InputGroup className="mb-3">
                  <RangeSlider
                    min={1}
                    max={data.totalResults}
                    value={currentLimit}
                    onChange={(e) => setCurrentLimit(parseInt(e.target.value, 10))}
                  />
                </InputGroup>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>
      <Animate>
        <Paginate currentPage={currentPage} totalPages={data.totalPages} onPageClick={onPageClicked}>
          <div className="bg-white p-3 mt-4 rounded">
            <Table hover className="user-table align-items-center">
              <thead>
                <tr>
                  <th className="border-bottom">Name</th>
                  <th className="border-bottom">Role</th>
                  <th className="border-bottom">Verified</th>
                  <th className="border-bottom">Action</th>
                </tr>
              </thead>
              <tbody className="p-3">
                {data.results.map((user) => (
                  <SingleUserRow user={user} key={user.id} />
                ))}
              </tbody>
            </Table>
          </div>
        </Paginate>
      </Animate>
    </>
  );
};

export default UserList;
