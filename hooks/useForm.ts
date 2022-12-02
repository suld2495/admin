import React from "react";

export default function useForm<T>(value: T): [T, React.ChangeEventHandler] {
  const [form, setForm] = React.useState(value);
  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    })
  }, [form]);

  return [form, handleChange];
};