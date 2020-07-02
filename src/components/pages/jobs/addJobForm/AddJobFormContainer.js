import React, {useState, useContext, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import AddJobForm from './AddJobForm';
import Toast from "../../../extension/Toast";
import {inventoryActions} from "../../../../store/actions/settings/inventory";
import {clientActions} from "../../../../store/actions/settings/clients";
import {employeesActions} from "../../../../store/actions/settings/employees";
import moment from "moment";

const AddJobFormContainer = props => {

  const {
    IS_UPDATING,
    dispatch,
    history,
    match,
    location,
    inventory,
    inventoryLoading,
    clients,
    clientsLoading,
    employees,
    employeesLoading,
    test
  } = props;

  const [showLine_itemAccordian, setLine_itemAccordian] = useState(true);
  const [showScheduleVisitAccordian, setScheduleVisitAccordian] = useState(true);
  const [showExpenseAccordian, setExpenseAccordian] = useState('expenses');
  const [showActivityAccordian, setActivityAccordian] = useState(false);
  const [activeTimeTracking_expenseMenu, setActiveTimeTracking_expenseMenu] = useState('expenses');
  const [activeActivityMenu, setActiveActivityMenu] = useState('reminder');
  const [subTotal, setSubTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [clientsOptions, setClientsOptions] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [inventoryOptions, setInventoryOptions] = useState([]);
  var Dropzone = null;

  const djsConfig = {
    addRemoveLinks: true,
    acceptedFiles: "image/jpeg,image/png,image/gif"
  };

  const componentConfig = {
    iconFiletypes: ['.jpg', '.png', '.gif'],
    showFiletypeIcon: true,
    postUrl: '/uploadHandler'
  };

  const paymentTypeOptions = [
    {
      key: 'cash',
      value: 'cash',
      text: 'Cash'
    },
    {
      key: 'credit-card',
      value: 'credit-card',
      text: 'Credit Card'
    },
  ]
  const internalNotesViaOptions = [
    {
      key: 'sms',
      value: 'sms',
      text: 'SMS'
    },
    {
      key: 'email',
      value: 'email',
      text: 'Email'
    },
  ]

  const lineItemTemplate = {item: '', description: '', qty: '0', unitCost: '0'};
  const expenseTemplate = {
    chargeType: 'casual',
    supplier: '',
    technician: '',
    description: '',
    date: '',
    purchaseOrder: '',
    receipt: '',
    paymentType: '',
    qty: '',
    amount: '',
    chargeToCustomer: false,
    lineItem: {
      ...lineItemTemplate
    }
  }
  const [expense, setExpense] = useState(expenseTemplate);
  const [expenseArray, setExpenseArray] = useState([]);

  const scheduleTemplate = {
    title: '',
    instructions: '',
    startDateTime: '',
    endDateTime: '',
    assignedTo: []
  }

  const dateTemplate = {
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: ''
  }
  const [date, setDate] = useState(dateTemplate)
  const [schedule, setSchedule] = useState({...scheduleTemplate});
  const [scheduleArray, setScheduleArray] = useState([]);

  const internalNotesTemplate = {
    to: '',
    via: '',
    subject: '',
    comments: ''
  }

  const [internalNotes, setInternalNotes] = useState({...internalNotesTemplate});


  const reminderTemplate = {
    type: 'call',
    subject: '',
    dateTime: '',
    assignedTo: [],
    comments: ''
  }
  const [reminder, setReminder] = useState({...reminderTemplate});

  const dataTemplate = {
    customer: '',
    title: '',
    description: '',
    jobType: 'non-recurring',
    status: 'unscheduled',
  }
  const [data, setData] = useState({...dataTemplate});

  const [errors, setErrors] = useState(false);
  const [lineItems, setLineItems] = useState([]);
  const [lineItem, setLineItem] = useState(lineItemTemplate);
  const searchRef = useRef(null);
  const lineItemSearchRef = useRef(null);

  useEffect(() => {
    dispatch(clientActions.getClients());
    dispatch(employeesActions.getEmployees());
    dispatch(inventoryActions.getInventory());
  }, []);

  useEffect(() => {
    if (clients) {
      const _clients = [...clients];
      const clientsOpt = _clients.map((client) => {
        return (
          {
            key: client._id,
            text: client.firstName + ' ' + client.lastName,
            value: client._id
          }
        )
      });
      setClientsOptions(clientsOpt);
    }
  }, [clients]);

  useEffect(() => {
    const _employees = [...employees];
    const employeesOpt = _employees.map((employee) => {
      return (
        {key: employee._id, text: employee.name, value: employee._id}
      )
    });
    setEmployeeOptions(employeesOpt);
  }, [employees]);

  useEffect(() => {
    const _inventory = [...inventory];
    const inventoryOpt = _inventory.map((inventory) => {
      return (
        {key: inventory._id, text: inventory.name, value: inventory._id}
      )
    });
    setInventoryOptions(inventoryOpt);
  }, [inventory]);

  const onSelectInternalNotesChange = (e, params) => {
    const name = params.name;
    const value = params.value;
    setInternalNotes({
      ...internalNotes,
      [name]: value
    })
  }

  const handleInternalNotesInputChange = (e) => {
    setInternalNotes({
      ...internalNotes,
      [e.target.name]: e.target.value
    })
  }

  const handleAddInternalNotes = (e) => {
    console.log('internal notes', internalNotes);
  }


  const handleReminderButtons = (e) => {
    setReminder({
      ...reminder,
      type: e.target.name
    })
  }

  const handleReminderInputChange = (e) => {
    setReminder({
      ...reminder,
      [e.target.name]: e.target.value
    })
  }

  const handleReminderDateTimeInput = (data) => {
    setDate({
      ...date,
      [data[1].name]: data[1].value
    });
    setReminder({
      ...reminder,
      dateTime: moment(`${date.startDate} ${date.startTime}`, 'YYYY-MM-DD HH:mm:ss').format()
    });
  }

  const onSelectReminderChange = (e, params) => {
    setReminder({
      ...reminder,
      [params.name]: params.value
    })
  }

  const handleAddReminder = (e) => {
    console.log('reminder->', reminder);
  }


  const handleAddSchedule = (e) => {
    const scheduleObj = {...schedule};
    setScheduleArray([
      ...scheduleArray, {...scheduleObj}
    ]);
    setSchedule({...scheduleTemplate});
    setDate({...dateTemplate});
  }

  const handleScheduleInputChange = (e) => {
    setSchedule({
      ...schedule,
      [e.target.name]: e.target.value
    })
  }

  const onSelectScheduleChange = (e, params) => {
    setSchedule({
      ...schedule,
      [params.name]: params.value
    })
  }

  const handleScheduleDateInput = (data) => {
    setDate({
      ...date,
      [data[1].name]: data[1].value
    });
    setSchedule({
      ...schedule,
      startDateTime: moment(`${date.startDate} ${date.startTime}`, 'YYYY-MM-DD HH:mm:ss').format(),
      endDateTime: moment(`${date.endDate} ${date.endTime}`, 'YYYY-MM-DD HH:mm:ss').format()
    });
  }

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }
  const onSelectChange = (e, params) => {
    const name = params.name;
    const value = params.value;
    setData({
      ...data,
      [name]: value
    })
  }

  const handleExpenseInputChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value
    });
  }

  const handleExpenseDateInputChange = (data) => {
    console.log(data);
    setExpense({
      ...expense,
      [data[1].name]: data[1].value
    });
  }
  const onSelectExpenseChange = (e, params) => {
    const name = params.name;
    const value = params.value;
    setExpense({
      ...expense,
      [name]: value
    })
  }

  const handleExpenseLineItemInputChange = (e) => {
    const exp = {...expense};
    exp.lineItem[e.target.name] = e.target.value;
    setExpense({...exp});
  };

  const onSelectExpenseLineItemChange = (e, params) => {
    const name = params.name;
    const value = params.value;
    const exp = {...expense};
    exp.lineItem[name] = value;
    exp.lineItem['name'] = e.currentTarget.textContent;
    setExpense({...exp});
  }

  const handleExpenseCheckBoxChange = (e, params) => {
    const name = params.name;
    const value = params.checked;
    setExpense({
      ...expense,
      [name]: value
    })
  }

  const handleAddTimeTracking = () => {
    const exp = {...expense};
    exp.chargeType = 'time-expense';
    if (!exp.chargeToCustomer) {
      exp.lineItem = {};
    }
    setExpenseArray([...expenseArray, {...exp}]);
    setExpense(expenseTemplate);
    console.log('expense array', expenseArray);
  }

  const handleAddExpense = () => {
    const exp = {...expense};
    exp.chargeType = 'expense-against-casual-items';
    if (!exp.chargeToCustomer) {
      exp.lineItem = {};
    }
    setExpenseArray([...expenseArray, {...exp}]);
    setExpense({...expenseTemplate});
  }

  const handleLineItemsInputChange = (e, index) => {
    const expenseArr = [...expenseArray];

    expenseArr.lineItem[index] = {
      ...expenseArr.lineItem[index],
      [e.target.name]: e.target.value,
    }
    setExpenseArray(expenseArr);
  }

  const handleLineItemInputChange = (e, index) => {
    setLineItem({...lineItem, [e.target.name]: e.target.value})
  }

  const handleAddLineItem = () => {
    if (lineItem.item) {
      const exp = {...expense};
      exp.lineItem = {...lineItem};
      exp.chargeType = 'casual';
      setExpenseArray([...expenseArray, {...exp}]);
      setLineItem(lineItemTemplate);
      lineItemSearchRef.current.setValue('');
      setErrors(false);
    } else {
      Toast('Line Item', 'Please select a product/service.', 'info', 3000);
    }
  }


  const handleSearchInventory = async (e, data) => {
    // dispatch(inventoryActions.searchInventory({text: data.value}));
  }

  const handleLineItemOption = (event, newData) => {
    const selectedInventory = newData.result;
    const {inventoryStock: {unitCost = null} = {}, description} = selectedInventory || {};
    setLineItem({
      name: selectedInventory.name,
      item: selectedInventory._id,
      description,
      qty: 1,
      unitCost: unitCost || 0,
    });
    lineItemSearchRef.current.setValue(selectedInventory.name);
  }

  const handleDeleteLineItem = (index) => {
    const lineItemsAvailable = [...lineItems];
    lineItemsAvailable.splice(index, 1);
    setLineItems(lineItemsAvailable);
  }

  const handleExpenseAccordian = (activeMenu = '') => {
    if (!activeMenu && showExpenseAccordian !== '')
      setExpenseAccordian(activeMenu)
    else if (!activeMenu && showExpenseAccordian == '') {
      setExpenseAccordian('expenses')
    } else if (activeMenu) {
      setExpenseAccordian(activeMenu)
    }
  }

  return (
    <AddJobForm data={{
      lineItems,
      setLineItems,
      lineItem,
      setLineItem,
      expenseArray,
      expense,
      handleLineItemsInputChange,
      handleLineItemInputChange,
      handleAddLineItem,
      handleDeleteLineItem,
      handleExpenseInputChange,
      onSelectExpenseChange,
      handleExpenseLineItemInputChange,
      onSelectExpenseLineItemChange,
      handleExpenseCheckBoxChange,
      handleAddTimeTracking,
      handleAddExpense,
      lineItemSearchRef,
      inventory,
      inventoryLoading,
      handleSearchInventory,
      handleLineItemOption,
      inventoryOptions,
      handleExpenseDateInputChange,
      data,
      handleInputChange,
      onSelectChange,
      schedule,
      scheduleArray,
      handleAddSchedule,
      handleScheduleInputChange,
      onSelectScheduleChange,
      handleScheduleDateInput,
      handleAddReminder,
      date,
      reminder,
      handleReminderButtons,
      handleReminderInputChange,
      handleReminderDateTimeInput,
      onSelectReminderChange,
      internalNotes,
      internalNotesViaOptions,
      onSelectInternalNotesChange,
      handleInternalNotesInputChange,
      handleAddInternalNotes,


      subTotal,
      setSubTotal,
      grandTotal,
      setGrandTotal,

      clientsOptions,
      clientsLoading,
      employeeOptions,
      paymentTypeOptions,

      djsConfig,
      componentConfig,
      showLine_itemAccordian,
      setLine_itemAccordian,
      showScheduleVisitAccordian,
      setScheduleVisitAccordian,
      showExpenseAccordian,
      setExpenseAccordian,
      activeTimeTracking_expenseMenu,
      setActiveTimeTracking_expenseMenu,
      showActivityAccordian,
      setActivityAccordian,
      activeActivityMenu,
      setActiveActivityMenu,
      handleExpenseAccordian
    }}/>
  )
}

AddJobFormContainer.propTypes = {
  IS_UPDATING: PropTypes.string,
}

const mapStateToProps = state => ({
  inventory: state.inventory.data,
  inventoryLoading: state.inventory.isLoading,
  inventoryItem: state.inventory.inventoryItem,
  clients: state.clients.data,
  clientsLoading: state.clients.isLoading,
  employees: state.employees.employees.data,
  employeesLoading: state.employees.employees.isLoading,
  test: state
});

export default withRouter(connect(mapStateToProps)(AddJobFormContainer));
