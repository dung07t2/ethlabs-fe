import { OutlinedTextFieldProps, TextField } from '@mui/material';
import clsx from 'clsx';
import React, { FC } from 'react';
import { Controller } from 'react-hook-form';
import { RHFInputProps } from '../types';

export interface RHFTextInputProps
  extends RHFInputProps,
    OutlinedTextFieldProps {}

export const RHFTextInput: FC<RHFTextInputProps> = ({
  id,
  name,
  control,
  label,
  InputProps,
  placeholder,
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
          <>
            <TextField
              id={`RHFTextInput-${id}`}
              name={name as string}
              label={label}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              error={!!error}
              helperText={
                error ? (
                  <span style={{ whiteSpace: 'pre-wrap' }}>
                    {error.message}
                  </span>
                ) : undefined
              }
              InputProps={InputProps}
              className={clsx(!!error && 'has-error')}
              {...props}
            />
          </>
        );
      }}
    />
  );
};
