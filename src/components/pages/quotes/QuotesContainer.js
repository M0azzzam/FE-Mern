import React, { useEffect, useState, useContext, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Quotes from './Quotes';
import { quoteActions } from '../../../store/actions/settings/quotes';
import { clientActions } from '../../../store/actions/settings/clients';
import Toast from '../../extension/Toast';
import { pagination } from '../../../config/config';
import SidePanelContext from '../../extension/SidePanelContext';
import AddClientFormContainer from '../clients/addClientsForm';
import { sortOrder, stringifySortOrder } from '../../../utils/sort';
import { stringifyClientName } from '../../../utils/quotes';
import upperFirst from 'lodash/upperFirst';
import indexOf from 'lodash/indexOf';
import pull from 'lodash/pull';
import moment from 'moment';

const QuotesContainer = props => {

  const {
    quotes,
    isLoading,
    meta,
    clients,
    clientsLoading,
    history,
    dispatch
  } = props;

  const sidePanelContext = useContext(SidePanelContext);
  const [showClientModal, setClientModal] = useState(false);
  const [showPropertyModal, setPropertyModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState({});
  const [sortParams, setSortParams] = useState({
    estimateId: '',
    createdAt: 'desc'
  });
  const [sortArray, setSortArray] = useState(['estimateId.', 'createdAt.desc']);
  const [searchParams, setSearchParams] = useState({});
  const [activeFilter, setActiveFilter] = useState('TODAY');
  const [calendarFilters, setCalendarFilter] = useState({
    dateFrom: moment().startOf('day').toISOString(),
    dateTo: moment().endOf('day').toISOString()
  });
  const [limit, setLimit] = useState(pagination && pagination.limit);
  const [showStatus, setShowStatus] = useState(null);
  const [selectedQuotes, setSelectedQuotes] = useState([]);
  const [pageOptions] = useState(pagination && pagination.list);
  const customerSearchRef = useRef(null);

  useEffect(() => {
    dispatch(quoteActions.getQuotes({
      ...meta,
      ...calendarFilters,
      sort: sortArray
    }));
    dispatch(clientActions.getClients({ limit: 4 }))
  }, []);

  const handleAddQuote = () => {
    history.push({
      pathname: `/app/work/quotes/add`, state: {
        selectedClient,
        propertyDetails: (selectedClient.propertyDetails || {})
      }
    });
  }

  const handleEditQuote = (id) => {
    history.push(`/app/work/quotes/edit/${id}`);
  }

  const handleViewQuote = (id) => {
    history.push(`/app/work/quotes/view/${id}`);
  }

  const handleDeleteQuote = async (data) => {
    const quote = [data._id];
    try {
      await dispatch(quoteActions.deleteQuote(quote));

      Toast('Delete Quote', `Quote deleted successfully`, 'success');
      dispatch(quoteActions.getQuotes({
        ...meta,
        ...searchParams,
        sort: sortArray,
        ...calendarFilters
      }));
    } catch (err) {
      Toast('Delete Quote', `Quote could not be deleted. Please retry!`, 'danger');
    }
  }

  const handleDeleteQuotes = async () => {
    try {
      await dispatch(quoteActions.deleteQuote(selectedQuotes));

      Toast('Delete Quotes', `Quotes deleted successfully`, 'success');
      dispatch(quoteActions.getQuotes({
        ...meta,
        ...searchParams,
        sort: sortArray,
        ...calendarFilters
      }));
    } catch (err) {
      Toast('Delete Quotes', `Quotes could not be deleted. Please retry!`, 'danger');
    }
  }

  const handleClientModal = (flag) => {
    setClientModal(flag);
  }

  const handlePropertyModal = (flag, client = {}) => {
    setPropertyModal(flag);
    if (flag) {
      setSelectedClient(client);
    }
  }

  const handleProperty = () => {
    handleAddQuote();
  }

  const handleAddCustomer = () => {
    setClientModal(false);
    sidePanelContext.setData({ Component: AddClientFormContainer, data: { successCallback: () => { setClientModal(true) }, failureCallback: () => { setClientModal(true) }, cancelCallback: () => { setClientModal(true) } }, sidebarConfig: { width: 700 } });
  }

  const handleSearchClients = async (e, data) => {
    await dispatch(clientActions.searchClients({ text: data.value }))
  }

  const handleDateChange = (which, payload) => {
    const { startDate, endDate } = which;
    let _searchParams = {};
    if (startDate.isSame(endDate)) {
      setSearchParams({ ...searchParams, dateFrom: startDate.startOf('day').toISOString(), dateTo: endDate.endOf('day').toISOString() });
      _searchParams = { ...searchParams, dateFrom: startDate.startOf('day').toISOString(), dateTo: endDate.endOf('day').toISOString() };
    } else {
      setSearchParams({ ...searchParams, dateFrom: startDate.startOf('day').toISOString(), dateTo: endDate.endOf('day').toISOString() });
      _searchParams = { ...searchParams, dateFrom: startDate.startOf('day').toISOString(), dateTo: endDate.endOf('day').toISOString() };
    }
    setActiveFilter('');
    dispatch(quoteActions.getQuotes({
      ...searchParams,
      ..._searchParams,
      sort: sortArray,
      limit
    }));
  }

  const formatDateRange = (dateFrom = moment(), dateTo = moment()) => {
    if (!dateFrom && !dateTo) return '';
    const df = moment(dateFrom).format('DD MMM, YYYY');
    const de = moment(dateTo).format('DD MMM, YYYY');
    return df + ' - ' + de;
  }

  const computeSearchParams = (filter) => {
    const today = moment();
    switch (filter) {
      case 'TODAY': {
        let startOfDay = today.startOf('day').toISOString();
        let endOfDay = today.endOf('day').toISOString();
        return {
          dateFrom: startOfDay,
          dateTo: endOfDay
        };
      }
      case 'YESTERDAY': {
        let yesterday = today.subtract(1, 'day');
        let startOfYesterday = yesterday.startOf('day').toISOString();
        let endOfYesterday = yesterday.endOf('day').toISOString();
        return {
          dateFrom: startOfYesterday,
          dateTo: endOfYesterday
        }
      }
      case 'THIS WEEK': {
        let startOfWeek = today.startOf('week').toISOString();
        let endOfWeek = today.endOf('week').toISOString();
        return {
          dateFrom: startOfWeek,
          dateTo: endOfWeek
        }
      }
      case 'THIS MONTH': {
        let startOfMonth = today.startOf('month').toISOString();
        let endOfMonth = today.endOf('month').toISOString();
        return {
          dateFrom: startOfMonth,
          dateTo: endOfMonth
        }
      }
      case 'LAST MONTH': {
        let lastMOnth = today.subtract(1, 'month');
        let startOfMonth = lastMOnth.startOf('month').toISOString();
        let endOfMonth = lastMOnth.endOf('month').toISOString();
        return {
          dateFrom: startOfMonth,
          dateTo: endOfMonth
        }
      }
      case 'THIS YEAR': {
        let startOfYear = today.startOf('year').toISOString();
        let endOfYear = today.endOf('year').toISOString();
        return {
          dateFrom: startOfYear,
          dateTo: endOfYear
        }
      }
      case 'ALL': {
        return {
          dateFrom: '',
          dateTo: ''
        }
      }
    }
  }

  const handleFilterChange = async (e, data) => {
    let value = data.value;
    let client = null;

    if (data.name === 'customerId') {
      client = data.result;
      customerSearchRef.current.setValue(stringifyClientName(client));
      value = client && client._id;
    }

    setSearchParams({
      ...searchParams,
      [data.name]: value,
      ...calendarFilters,
    });
    await dispatch(quoteActions.getQuotes({
      ...searchParams,
      [data.name]: value,
      sort: sortArray,
      ...calendarFilters,
      limit
    }));
  }

  const handleCalendarFilter = async (filter) => {
    setActiveFilter(filter);
    const _calendarFilter = computeSearchParams(filter);
    setSearchParams({
      ...searchParams,
      ..._calendarFilter,
    });
    setCalendarFilter({
      ..._calendarFilter
    });
    await dispatch(quoteActions.getQuotes({
      ...searchParams,
      sort: sortArray,
      ..._calendarFilter,
      limit,
    }));
  }

  const handleSort = async (data) => {
    let value = sortOrder(data, sortParams);
    setSortParams({
      ...sortParams,
      [data]: value
    });
    const _sortParams = {
      ...sortParams,
      [data]: value
    };
    const sortArr = stringifySortOrder(_sortParams);
    setSortArray([...sortArray]);
    await dispatch(quoteActions.getQuotes({
      sort: sortArr,
      ...searchParams,
      ...calendarFilters,
      limit
    }));
  }

  const handleStatusChange = async (e, data, id) => {
    await dispatch(quoteActions.updateQuoteStatus({
      id,
      status: data.value
    }));
  }

  const quotesIds = quotes.map(quote => {
    return quote._id
  })

  const handleSelectAll = () => {
    setSelectedQuotes([
      ...quotesIds
    ]);
  }

  const handleSelect = (id) => {
    if (indexOf(selectedQuotes, id) === -1) {
      setSelectedQuotes([
        ...selectedQuotes,
        id
      ]);
    } else {
      let _selectedQuotes = pull([...selectedQuotes], id);
      setSelectedQuotes([
        ..._selectedQuotes
      ]);
    }
  }

  const handleKeyUp = (e) => {
    let value = parseInt(e.target.value)
    if (e.keyCode === 13 && value <= meta.totalPages && value !== meta.page) {
      dispatch(quoteActions.getQuotes({ page: value, limit }));
      e.target.value = '';
    } else if (e.keyCode === 13) {
      e.target.value = '';
    }
  }

  const handleOnPaginationChange = data => {
    dispatch(quoteActions.getQuotes({
      page: data[1].activePage,
      limit,
      ...searchParams,
      sort: sortArray,
      ...calendarFilters
    }));
  }

  const handleItemsPerPage = data => {
    setLimit(data.value);
    dispatch(quoteActions.getQuotes({
      page: 1,
      limit: data.value,
      ...searchParams,
      sort: sortArray,
      ...calendarFilters
    }));
  }

  const statusOptions = [
    {
      key: 'None',
      value: '',
      text: 'None'
    },
    {
      key: 'Draft',
      value: 'DRAFT',
      text: 'Draft'
    },
    {
      key: 'Awaiting',
      value: 'AWAITING',
      text: 'Awaiting'
    },
    {
      key: 'Approved',
      value: 'APPROVED',
      text: 'Approved'
    },
    {
      key: 'Converted',
      value: 'CONVERTED',
      text: 'Converted'
    },
    {
      key: 'Archived',
      value: 'ARCHIVED',
      text: 'Archived'
    }
  ];

  const statusColors = {
    draft: 'grey',
    awaiting: 'orange',
    approved: 'blue',
    converted: 'green',
    archived: 'red'
  }

  const showStatusText = (status = '') => {
    return upperFirst(status.toUpperCase());
  }

  return <Quotes data={{
    handleAddQuote,
    handleEditQuote,
    handleViewQuote,
    handleDeleteQuote,
    handleDeleteQuotes,
    handleKeyUp,
    handleOnPaginationChange,
    handleItemsPerPage,
    handleClientModal,
    handlePropertyModal,
    handleAddCustomer,
    handleProperty,
    handleSearchClients,
    handleFilterChange,
    handleSort,
    handleStatusChange,
    handleSelectAll,
    handleSelect,
    handleCalendarFilter,
    handleDateChange,
    quotes,
    clients,
    isLoading,
    clientsLoading,
    pageOptions,
    statusOptions,
    meta,
    selectedClient,
    setSelectedClient,
    showClientModal,
    showPropertyModal,
    customerSearchRef,
    searchParams,
    setShowStatus,
    showStatus,
    sortParams,
    showStatusText,
    statusColors,
    selectedQuotes,
    quotesIds,
    activeFilter,
    formatDateRange
  }} />
}

const mapStateToProps = state => ({
  quotes: state.quotes.data,
  isLoading: state.quotes.isLoading,
  meta: state.quotes.meta,
  clients: state.clients.data,
  clientsLoading: state.clients.isLoading
})

export default withRouter(connect(mapStateToProps)(QuotesContainer));
