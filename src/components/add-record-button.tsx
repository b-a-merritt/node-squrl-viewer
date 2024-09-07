'use client';
import React from 'react';
import { AddRecordContext } from '@/context/add-record';

export const AddRecordButton = () => {
  const {addRecord, setAddRecord} = React.useContext(AddRecordContext);

  if (addRecord) return null;
  
  return (
    <button className="outline" onClick={() => setAddRecord(true)}>Add row</button>
  )
}