import "../style.css";

import React, { useState } from "react";
import {
  SideMenuLayout,
  DateRangeSelector,
  CheckboxGroup,
} from "../../Components";

import { DATE_RANGE_PRESETS } from "../../Utils/date";
import TransactionList from "./TransactionList.js";

function Transactions({ accounts = [], onTransactionEdit = () => {} }) {
  const [dateRange, setDateRange] = useState(DATE_RANGE_PRESETS[0].value);
  const [selectedPreset, setSelectedPreset] = useState(
    DATE_RANGE_PRESETS[0].presetId
  );
  const accountCheckboxes = accounts.map((a) => ({
    label: a.institution_name + " - " + a.name,
    value: a._id,
  }));
  const [filter, setFilter] = useState(accountCheckboxes.map((a) => a.value));
  /*const onTransactionEdit = (editedTransaction) => {
    let newTransactions = [...transactions];
    for (let i = 0; i < newTransactions.length; i++) {
      if (
        newTransactions[i].transaction_id === editedTransaction.transaction_id
      ) {
        newTransactions[i] = editedTransaction;
      }
    }

    setTransactions(newTransactions);
  };*/

  return (
    <SideMenuLayout
      page="Transactions"
      sideMenuTitle="Filters"
      sideMenuContent={
        <CheckboxGroup
          options={accountCheckboxes}
          value={filter}
          onChange={(f) => {
            setFilter(f);
          }}
        />
      }
      content={
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <DateRangeSelector
            preset={selectedPreset}
            value={dateRange}
            presets={DATE_RANGE_PRESETS}
            onChange={(preset, value) => {
              setDateRange(value);
              setSelectedPreset(preset);
            }}
          />
          <TransactionList
            accounts={accounts}
            onTransactionEdit={onTransactionEdit}
            accountFilter={filter}
          />
        </div>
      }
    />
  );
}

export default Transactions;
