import React from 'react';
import { Switch, SwitchProps } from '@mui/material';
import { Controller } from 'react-hook-form';

interface RHFSwitchProps extends SwitchProps {
  control: any;
  setValue?: any;
}

export const RHFSwitch: React.FC<RHFSwitchProps> = ({
  id,
  name,
  control,
  setValue,
  ...props
}) => {
  return (
    <Controller
      name={name as any}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState
      }) => {
        return (
          <Switch
            id={`RHFSwitch-${id}`}
            onChange={onChange}
            value={value}
            checked={value}
            {...props}
          />
        );
      }}
    />
  );
};
