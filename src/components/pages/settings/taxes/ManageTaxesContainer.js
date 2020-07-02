import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import ManageTaxes from './ManageTaxes';
import SidePanelContext from '../../../extension/SidePanelContext';
import AddTaxFormContainer from './addTaxForm';
import { taxActions } from '../../../../store/actions/settings/taxes';
import Toast from '../../../extension/Toast';

const ManageTaxesContainer = props => {

  const { taxes, isLoading, dispatch } = props;
  const sidePanelContext = useContext(SidePanelContext);
  useEffect(() => {
    dispatch(taxActions.getTaxes({ limit: 0 }));
  }, []);

  const handleAddTax = () => {
    sidePanelContext.setData({ Component: AddTaxFormContainer, data: {}, sidebarConfig: { width: 500 } });
  }

  const handleUpdateTax = (data) => {
    sidePanelContext.setData({ Component: AddTaxFormContainer, data: { ...data, IS_UPDATING: true }, sidebarConfig: { width: 500 } });
  }

  const handleDeleteTax = async (data) => {
    const item = [data._id];
    try {
      await dispatch(taxActions.deleteTax(item));

      Toast('Delete Tax', `Tax ${data.name} deleted successfully`, 'success');
      dispatch(taxActions.getTaxes({ limit: 0 }));
    } catch (err) {
      Toast('Delete Tax', `Tax ${data.name} could not be deleted. Please retry!`, 'danger');
    }
  }

  return (
    <ManageTaxes data={{
      handleAddTax,
      handleUpdateTax,
      handleDeleteTax,
      taxes,
      isLoading
    }} />
  )
}

const mapStateToProps = state => ({
  taxes: state.taxes.data,
  isLoading: state.taxes.isLoading
})

export default connect(mapStateToProps)(ManageTaxesContainer);
