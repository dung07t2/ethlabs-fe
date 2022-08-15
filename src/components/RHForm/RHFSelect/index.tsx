import React, { FC } from 'react';
import { Controller } from 'react-hook-form';
import { RHFInputProps } from '../types';
import { MenuItem, OutlinedTextFieldProps, TextField } from '@mui/material';

interface RHFSelectProps extends RHFInputProps, OutlinedTextFieldProps {
  options: Array<any>;
}

export const RHFSelect: FC<RHFSelectProps> = ({
  id,
  name,
  control,
  label,
  setValue,
  placeholder,
  options = [],
  ...props
}) => {
  return (
    <Controller
      name={name as string}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState
      }) => {
        return (
          <TextField
            id={`RHFSelect-${id}`}
            select
            label={label}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            error={!!error}
            helperText={error ? error.message : null}
            {...props}
          >
            {options.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.text}
              </MenuItem>
            ))}
          </TextField>
        );
      }}
    />
  );
};
