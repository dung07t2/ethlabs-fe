import { TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { RHFInputProps } from '../types';

interface RHFDateTimePickerProps extends RHFInputProps {
  name: string;
}

export const RHFDateTimePicker: FC<RHFDateTimePickerProps> = ({
  name,
  control,
  setValue,
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
      }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            value={value}
            onChange={onChange}
            renderInput={props => (
              <TextField
                {...props}
                margin="normal"
                error={!!error}
                helperText={error ? error.message : null}
                placeholder="00 / 00 /0000 - 23:00 +GMT"
              />
            )}
            {...props}
          />
        </LocalizationProvider>
      )}
    />
  );
};
