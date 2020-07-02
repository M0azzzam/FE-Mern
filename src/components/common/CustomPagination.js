import React from 'react';
import {
  Form,
  Dropdown,
  Pagination,
  Input
} from 'semantic-ui-react';
import { pageInfo, documentsInfo } from '../../utils/agGrid';

const CustomPagination = props => {

  const {
    handleKeyUp,
    handleItemsPerPage,
    handleOnPaginationChange,
    meta,
    pageOptions
  } = props.data || {};

  return (
    <div className='paginationMain'>
      <div className='paginationChild'>
        <p className='marginLessBottom marginLeft paginationTextColor'>Go to page</p>
        <Form.Field
          style={{ width: '50px', height: 30, marginLeft: 5 }}
          control={Input}
          name='goToPage'
          onKeyUp={handleKeyUp}
        />
        <p className='marginLessBottom marginLeft paginationTextColor'>Items per page</p>
        <Dropdown
          style={{ marginLeft: 5, height: 30 }}
          compact
          inline
          options={pageOptions}
          defaultValue={pageOptions && pageOptions.length > 0 && pageOptions[0].value}
          button={true}
          onChange={(event, data) => handleItemsPerPage(data)}
        />
        <div>
          <Pagination
            size='mini'
            activePage={(meta && meta.page) ? meta.page : 1}
            totalPages={(meta && meta.totalPages) ? meta.totalPages : 1}
            siblingRange={1}
            firstItem={null}
            lastItem={null}
            ellipsisItem={null}
            boundaryRange={0}
            onPageChange={(...data) => handleOnPaginationChange(data)}
          />
        </div>
        <p className='marginLessBottom marginLeft paginationTextColor'>{pageInfo(meta)}</p>
        <p className='marginLessBottom marginLeft paginationTextColor'>&lt;{documentsInfo(meta)}&gt;</p>
      </div>
    </div>
  )
}

export default CustomPagination;
