import React, { useEffect } from 'react';
import { composeClasses } from '../../../utils/composeClasses';
import { CommonProps } from '../type';
import styled from './table.module.scss';
import useCheckbox, { Action } from './hooks/useCheckbox';
import Checkbox from '../checkbox/Checkbox';

interface Column<RowData extends object> {
  title: string | React.ReactNode;
  field: keyof RowData | string;
  align?: string;
}

export interface RowData {
  [key: string]: string | React.ReactNode;
}

interface ContextValue {
  data: RowData[], 
  columns: Column<RowData>[],
  checkedList: string[],
  selection: boolean;
  onCheckAll: (data: RowData[]) => void, 
  onRemoveAllCheck: () => void
  onToggleCheck: (id: string) => void;
}

const initialValue: ContextValue = {
  data: [],
  columns: [],
  checkedList: [],
  selection: false,
  onCheckAll() {},
  onRemoveAllCheck() {},
  onToggleCheck() {}
}

export const TableContext = React.createContext(initialValue);

const TableHead = () => {
  const { columns, selection } = React.useContext(TableContext);

  return (
    <>
      <thead>
        <tr className={styled.head}>
          {selection ? (
            <th key='check'><AllCheckbox /></th>
          ): null}
          {columns?.map(({ title, field }) => (
            <th key={field}>{title}</th>    
          ))}
        </tr>
      </thead>
    </>
  )
};

const TableRow = ({ row }: { row: RowData }) => {
  const { columns, selection, onToggleCheck, checkedList } = React.useContext(TableContext);
  const handleCheckboxChange = () => {
    onToggleCheck(row.id as string);
  };

  return (
    <>
      <tr className={styled.body}>
        {selection ? (
          <td className={styled.center}>
            <Checkbox onChange={handleCheckboxChange} checked={checkedList.includes(row.id as string)} />
          </td>
        ) : null}
        {columns.map(({ field, align }) => (
          <td className={composeClasses(styled[align || 'left'])} key={field}>{row[field]}</td>
        ))}
      </tr>
    </>
  )
};

const TableBody = () => {
  const { columns, data } = React.useContext(TableContext);

  return (
    <>
      <tbody>
        {data?.length ? data?.map((row, index) => (
          <TableRow key={index} row={row} />
        )): (
          <tr className={composeClasses(styled.body, styled.nodata)}>
            <td colSpan={columns.length}>데이터가 존재하지 않습니다.</td>
          </tr>
        )}
      </tbody>
    </>
  )
};

const AllCheckbox = () => {
  const [check, setCheck] = React.useState(false);
  const { checkedList, onCheckAll, onRemoveAllCheck, data } = React.useContext(TableContext);
  
  useEffect(() => {
    setCheck(checkedList.length === data.length);
  }, [checkedList, data]);

  const handleChange = React.useCallback(() => {
    const changedCheck = !check;
    setCheck(changedCheck);

    if (changedCheck) {
      onCheckAll(data);
    } else {
      onRemoveAllCheck();
    }
  }, [data, check, onCheckAll, onRemoveAllCheck]);

  return (
    <Checkbox onChange={handleChange} checked={check} />
  )
};

type TableProps<RowData extends object> = CommonProps & {
  selection?: boolean;
  data: RowData[];
  columns: Column<RowData>[];
  children?: React.ReactElement;
}

export default function Table({ children, className = '', unStyled = false, selection = true, ...rest }: TableProps<RowData>) {
  const [checkedList, onCheckAll, onRemoveAllCheck, onToggleCheck] = useCheckbox();
  const tableClasses = composeClasses(className, unStyled ? '' : styled.table);

  return (
    <TableContext.Provider 
      value={{ 
        checkedList, 
        onCheckAll, 
        onRemoveAllCheck, 
        onToggleCheck,
        selection, 
        ...rest 
      }}
    >
      <table className={tableClasses}>
        <TableHead/> 
        <TableBody/>
        {children}
      </table>
    </TableContext.Provider>
  )
}
