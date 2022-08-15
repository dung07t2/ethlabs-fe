import React, { FC, useEffect, useState } from 'react';
import {
  FormGroup,
  InputLabel,
  OutlinedTextFieldProps,
  Typography
} from '@mui/material';
import { RHFInputProps } from '../types';
import { RHFTextInput } from 'components';

export interface RHFTextareaProps
  extends RHFInputProps,
    OutlinedTextFieldProps {
  inputLabel?: string;
  valueWatch?: any;
}

export const RHFTextarea: FC<RHFTextareaProps> = ({
  id,
  inputLabel,
  control,
  valueWatch,
  ...props
}) => {
  const maxLength = (process.env.formLimitTextarea as any) || 255;
  const [countTextAreaLength, setCountTextAreaLength] =
    useState<number>(maxLength);

  useEffect(
    () => setCountTextAreaLength(maxLength - valueWatch),
    [maxLength, valueWatch]
  );
  return (
    <FormGroup className="form-control-textarea">
      {inputLabel && <InputLabel htmlFor={id}>{inputLabel}</InputLabel>}
      <RHFTextInput
        id={id}
        control={control}
        inputProps={{ maxLength: maxLength }}
        multiline
        {...props}
      />
      <Typography
        variant="caption"
        align="right"
        className="textarea-counter"
        sx={{ color: '#BDBDBD' }}
        mt={0.5}
      >
        {countTextAreaLength} characters remaining.
      </Typography>
    </FormGroup>
  );
};
