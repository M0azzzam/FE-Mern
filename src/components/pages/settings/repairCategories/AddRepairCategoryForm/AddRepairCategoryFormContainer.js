import React, { useState, useContext, useEffect } from 'react';
import { connect } from 'react-redux'
import { Button, Icon, Form, Table } from 'semantic-ui-react';
import AddRepairCategoryForm from './AddRepairCategoryForm';
import SidePanelContext from '../../../../extension/SidePanelContext';
import Toast from '../../../../extension/Toast';
import { getManufacturers } from '../../../../../services/manufacturers';
import { getDevicesByManufacturers } from '../../../../../services/devices';
import { repairCategoriesActions } from '../../../../../store/actions/settings/repairCategories';

const AddRepairCategoryFormContainer = (props) => {

  const temp_row_object = { manufacturer: '', manufacturerAvailableOptions: [], manufacturerName: '', isEdit: true, devices: { availableOptions: [], selectedOptions: [], devicesName: '' } }
  const { dispatch } = props;
  const { meta, gridApi, IS_UPDATING } = props.data || {};
  const sidePanelContext = useContext(SidePanelContext);
  const [manufacturerOptions, setManufacturerOptions] = useState([]);
  const [manufacturerDevicesList, setManufacturerDevicesList] = useState([]);
  const [manufacturerDevicesLoading, setManufacturerDevicesLoading] = useState(false);
  let dropzone = null;

  const [data, setData] = useState({
    name: IS_UPDATING ? props.data.name : '',
    triggers: {
      onPOS: IS_UPDATING ? props.data.triggers.onPOS : true,
      onWidget: IS_UPDATING ? props.data.triggers.onWidget : true
    },
    manufacturers: []
  });

  const updateManufacturerDevicesList = () => {

    const manufacturerDevices = props.data.manufacturers.map((manufacturerRow) => ({
      ...temp_row_object,
      isEdit: false,
      manufacturer: manufacturerRow.manufacturer._id,
      manufacturerName: manufacturerRow.manufacturer.name,
      devices: {
        ...temp_row_object.devices,
        selectedOptions: manufacturerRow.devices.map(device => device._id),
        devicesName: manufacturerRow.devices.map(device => device.name).join(", ")
      }
    }))
    setManufacturerDevicesList(manufacturerDevices)
  }

  const fetchManufacturers = async () => {
    try {
      const result = await getManufacturers();
      const options = result.data.data.map((manufacturer) => ({
        value: manufacturer._id,
        text: manufacturer.name
      }))
      setManufacturerOptions(options);
      if (!IS_UPDATING && options.length > 0) {
        setManufacturerDevicesList([temp_row_object])
      }
      setManufacturerDevicesLoading(false)
    } catch (err) {
      console.log('Error::FetchManufacturer', err);
      Toast('Fetching Manufacturers', 'Manufacturers could not be retrieved!', 'danger');
    }
  }

  useEffect(() => {
    fetchManufacturers();
    setManufacturerDevicesLoading(true);
    if (IS_UPDATING) {
      updateManufacturerDevicesList();
    }
  }, [])


  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleTriggers = (newData) => {
    setData({
      ...data,
      triggers: {
        ...data.triggers,
        [newData.name]: newData.checked
      }
    })
  }

  const save = async () => {
    try {
      const { triggers, ...rest } = data;

      for (const prop in rest) {
        if (!rest[prop]) return Toast('Missing Information', 'Please fill in required fields.', 'danger');
      }
      const manufacturers = []
      for (const manufacturerDevices of manufacturerDevicesList) {
        if ((!manufacturerDevices.manufacturer) || manufacturerDevices.devices.selectedOptions.length < 1) {
          return Toast('Missing Information', 'Please fill in required fields.', 'danger');
        } else {
          manufacturers.push({ "manufacturer": manufacturerDevices.manufacturer, devices: manufacturerDevices.devices.selectedOptions })
        }
      }

      if (IS_UPDATING) {
        const { _id: id } = props.data;

        await dispatch(repairCategoriesActions.updateRepairCategory({ id, ...data, manufacturers }));
        sidePanelContext.hide();
        Toast('Update Repair Category', `Repair Category ${data.name} updated successfully`, 'success');

        await dispatch(repairCategoriesActions.getRepairCategories(meta));
        gridApi.redrawRows();
      } else {
        await dispatch(repairCategoriesActions.createRepairCategory({ ...data, manufacturers }));
        Toast('Create Repair Category', `Repair Category ${data.name} created successfully`, 'success');
        sidePanelContext.hide();
        dispatch(repairCategoriesActions.getRepairCategories(meta));
      }
    } catch (err) {
      let message;

      message = IS_UPDATING ? 'Repair Category could not be updated. Please retry!' : 'Repair Category could not be created successfully. Please retry!';
      if (err.response && err.response.data && err.response.data.reason) {
        message = err.response.data.reason
      }

      Toast('Update Repair Category', message, 'danger');
    }
  }


  const fetchDevices = async (manufacturer, index) => {

    try {
      const result = await getDevicesByManufacturers({ manufacturer: manufacturer });
      const options = result.data.map((device) => ({
        value: device._id,
        text: device.name
      }))
      const manufacturerDevices = [...manufacturerDevicesList];
      manufacturerDevices[index].devices.availableOptions = options;
      setManufacturerDevicesList(manufacturerDevices);
      setManufacturerDevicesLoading(false);
    } catch (err) {
      console.log('Error::FetchDevices', err);
      Toast('Fetching Devices', 'Devices could not be retrieved!', 'danger');
    }

  }
  const djsConfig = {
    addRemoveLinks: true,
    acceptedFiles: "image/jpeg,image/png,image/gif"
  };

  const componentConfig = {
    iconFiletypes: ['.jpg', '.png', '.gif'],
    showFiletypeIcon: true,
    postUrl: '/uploadHandler'
  };

  const callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];
  const callback = () => console.log('Hello!');
  const success = file => console.log('uploaded', file);
  const removedfile = file => console.log('removing...', file);

  const eventHandlers = {
    init: dz => { return (dropzone = dz, console.log(dz)) },
    drop: callbackArray,
    addedfile: callback,
    success: success,
    removedfile: removedfile
  };

  const handleAddRow = () => {
    setManufacturerDevicesList([...manufacturerDevicesList, temp_row_object]);
  }

  const handleRemoveRow = (index) => {
    const manufacturerDevicesRow = [...manufacturerDevicesList];
    manufacturerDevicesRow.splice(index, 1);
    setManufacturerDevicesList(manufacturerDevicesRow);
  }

  const handleManufacturerChange = (newData, index) => {
    const manufacturerDevicesRows = [...manufacturerDevicesList];
    manufacturerDevicesRows[index].manufacturer = newData[1].value;
    setManufacturerDevicesList(manufacturerDevicesRows);
    setManufacturerDevicesLoading(true);
    fetchDevices(manufacturerDevicesRows[index].manufacturer, index);
  }

  const handleEditManufacturerDevices = (index) => {
    const manufacturerDevicesRows = [...manufacturerDevicesList];
    setManufacturerDevicesLoading(true);
    fetchDevices(manufacturerDevicesRows[index].manufacturer, index);
    manufacturerDevicesRows[index].isEdit = true;
    setManufacturerDevicesList(manufacturerDevicesRows);
    changeManufactureList(index);
  }

  const handleManufacturerSelectOpen = (manufacturerDevicesIndex) => {
    changeManufactureList(manufacturerDevicesIndex);
  }

  const handleDeviceChange = (newData, index) => {
    const manufacturerDevicesRows = [...manufacturerDevicesList];
    manufacturerDevicesRows[index].devices.selectedOptions = newData[1].value;
    setManufacturerDevicesList(manufacturerDevicesRows);
  }

  const changeManufactureList = (manufacturerDevicesIndex) => {
    const manufacturerDevicesRows = [...manufacturerDevicesList];
    const selectedDevices = manufacturerDevicesRows.map((manufacturerDevices, index) => {
      return manufacturerDevices.manufacturer
    })

    const notIncludeDefaultManufacturer = selectedDevices.indexOf(manufacturerDevicesRows[manufacturerDevicesIndex].manufacturer);
    if (notIncludeDefaultManufacturer > -1) {
      selectedDevices.splice(notIncludeDefaultManufacturer, 1)
    }
    const cloned = manufacturerOptions.filter((option) => { return (selectedDevices.indexOf(option.value) === -1) });
    manufacturerDevicesRows[manufacturerDevicesIndex].manufacturerAvailableOptions = cloned;
    setManufacturerDevicesList(manufacturerDevicesRows);
  }

  const tableRowList = rows => {
    const rowItem = rows.map((row, index) =>
      <Table.Row key={index}>
        <Table.Cell >
          {row.isEdit ? (
            < Form.Select
              fluid
              options={row.manufacturerAvailableOptions}
              placeholder='Manufacturer'
              value={row.manufacturer}
              onChange={(...params) => handleManufacturerChange(params, index)}
              onOpen={() => handleManufacturerSelectOpen(index)}
              name='manufacturer'
            />) : (
              <span>{row.manufacturerName}</span>
            )}
        </Table.Cell>
        <Table.Cell>
          {row.isEdit ? (
            <Form.Select
              disabled={row.devices.availableOptions.length > 0 ? false : true}
              fluid
              options={row.devices.availableOptions}
              value={row.devices.selectedOptions}
              search
              onChange={(...params) => handleDeviceChange(params, index)}
              placeholder='Devices'
              multiple
            />
          ) : (
              <span>{row.devices.devicesName}</span>
            )}
        </Table.Cell>
        <Table.Cell >
          {IS_UPDATING && (
            <Button color='green' size='mini' compact onClick={() => handleEditManufacturerDevices(index)}> <Icon fitted name='edit' /></Button>
          )}
          {rows.length > 1 && (
            <Button color='red' size='mini' compact onClick={() => handleRemoveRow(index)}> <Icon fitted name='remove' /></Button>
          )}
        </Table.Cell>
      </Table.Row>
    );
    return rowItem
  }
  return (
    <AddRepairCategoryForm data={{
      sidePanelContext,
      componentConfig,
      eventHandlers,
      djsConfig,
      manufacturerOptions,
      manufacturerDevicesLoading,
      manufacturerDevicesList,
      handleInputChange,
      handleTriggers,
      handleManufacturerChange,
      handleAddRow,
      handleRemoveRow,
      handleManufacturerSelectOpen,
      handleEditManufacturerDevices,
      handleDeviceChange,
      data,
      save,
      IS_UPDATING,
      tableRowList
    }} />
  )
}

export default connect()(AddRepairCategoryFormContainer);
