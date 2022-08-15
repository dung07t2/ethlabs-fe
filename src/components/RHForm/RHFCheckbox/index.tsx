import {
  Checkbox,
  FormControlLabel,
  FormControlLabelProps,
  Typography
} from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

interface RHFCheckboxProps extends FormControlLabelProps {
  control: any;
}

export const RHFCheckbox: React.FC<RHFCheckboxProps> = ({
  id,
  name,
  label,
  control,
  ...props
}) => {
  return (
    <Controller
      name={name as any}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <FormControlLabel
            id={`RHFCheckbox-${id}`}
            control={<Checkbox />}
            label={
              <Typography color={!!error ? 'error' : ''}>{label}</Typography>
            }
            checked={value}
            onChange={onChange}
            {...props}
          />
        );
      }}
    />
  );
};
