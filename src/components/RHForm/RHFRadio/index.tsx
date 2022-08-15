import {
  FormControlLabel,
  FormControlLabelProps,
  RadioGroup,
  RadioGroupProps
} from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

interface RHFRadioProps extends RadioGroupProps {
  control: any;
  setValue?: any;
  options: FormControlLabelProps[];
  hasEror?: (message: string | undefined) => void;
}

export const RHFRadio: React.FC<RHFRadioProps> = ({
  id,
  name,
  control,
  options = [],
  setValue,
  ...props
}) => {
  const generateRadioOptions = () => {
    return options.map((singleOption, i) => (
      <FormControlLabel
        key={i}
        {...singleOption}
        sx={{ mr: options.length - 1 === i ? 0 : undefined }}
      />
    ));
  };

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
          <RadioGroup
            id={`RHFRadio-${id}`}
            value={value}
            onChange={onChange}
            {...props}
          >
            {generateRadioOptions()}
          </RadioGroup>
        );
      }}
    />
  );
};
