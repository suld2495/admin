import React from 'react';
import styled from './table.module.scss';


interface Column<RowData extends object> {
  title: string;
  field: keyof RowData | string;
}

interface RowData {
  [key: string]: string | React.ReactNode;
}

const TableHead = ({ columns }: { columns: Column<RowData>[] }) => {
  return (
    <>
      <thead>
        <tr className={styled.head}>
          {columns?.map(({ title, field }) => (
            <th key={field}>{title}</th>    
          ))}
        </tr>
      </thead>
    </>
  )
};

const TableRow = ({ columns, row }: { columns: Column<RowData>[], row: RowData }) => {
  return (
    <>
      <tr className={styled.body}>
        {columns.map(({ field }) => (
          <td key={field}>{row[field]}</td>
        ))}
      </tr>
    </>
  )
};

const TableBody = ({ columns, data }: { columns: Column<RowData>[], data: RowData[] }) => {
  return (
    <>
      <tbody>
        {data?.map((row, index) => (
          <TableRow key={index} row={row} columns={columns} />
        ))}
      </tbody>
    </>
  )
};

interface TableProps<RowData extends object> {
  data: RowData[];
  columns: Column<RowData>[]
}

export default function Table({ data, columns }: TableProps<RowData>) {
  return (
    <table className={styled.table}>
      <TableHead columns={columns} /> 
      <TableBody columns={columns} data={data} />
    </table>
  )
}

