import React from 'react';
import { composeClasses } from '../../../utils/composeClasses';
import { CommonProps } from '../type';
import styled from './table.module.scss';


interface Column<RowData extends object> {
  title: string;
  field: keyof RowData | string;
  align?: string;
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
        {columns.map(({ field, align }) => (
          <td className={composeClasses(styled[align || 'left'])} key={field}>{row[field]}</td>
        ))}
      </tr>
    </>
  )
};

const TableBody = ({ columns, data }: { columns: Column<RowData>[], data: RowData[] }) => {
  return (
    <>
      <tbody>
        {data?.length ? data?.map((row, index) => (
          <TableRow key={index} row={row} columns={columns} />
        )): (
          <tr className={composeClasses(styled.body, styled.nodata)}>
            <td colSpan={columns.length}>데이터가 존재하지 않습니다.</td>
          </tr>
        )}
      </tbody>
    </>
  )
};

type TableProps<RowData extends object> = CommonProps & {
  data: RowData[];
  columns: Column<RowData>[];
}

export default function Table({ data, columns, className = '', unStyled = false }: TableProps<RowData>) {
  const tableClasses = composeClasses(className, unStyled ? '' : styled.table);

  return (
    <table className={tableClasses}>
      <TableHead columns={columns} /> 
      <TableBody columns={columns} data={data} />
    </table>
  )
}

