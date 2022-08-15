import React, { FC } from 'react';
import { Controller } from 'react-hook-form';
import { RHFInputProps } from '../types';
import {
  Chip,
  FormHelperText,
  MenuItem,
  Select,
  SelectProps
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { isEmpty } from 'lodash';

const useStyles = makeStyles(() => ({
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '-10px',
    marginBottom: '-12px'
  },
  chip: {
    margin: '4px',
    borderRadius: '10px',
    color: '#545454'
  }
}));

const MenuProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center'
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'center'
  }
} as any;

interface RHFMutiSelectProps extends RHFInputProps, SelectProps {
  options: Array<any>;
}

export const RHFMutiSelect: FC<RHFMutiSelectProps> = ({
  id,
  name,
  control,
  label,
  setValue,
  options = [],
  ...props
}) => {
  const classes = useStyles();

  const renderSelectedItems = (data: any) => {
    return (
      <div className={classes.chips}>
        {data?.map((value: string) => (
          <Chip key={value} label={value} className={classes.chip} />
        ))}
      </div>
    );
  };

  const renderSelectItems = (data: any) =>
    data?.map((item: any) => (
      <MenuItem key={item} value={item}>
        {item}
      </MenuItem>
    ));

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
            <Select
              id={`RHFMutiSelect-${id}`}
              fullWidth
              multiple
              variant="outlined"
              placeholder="Select item"
              value={value}
              onChange={onChange}
              renderValue={
                value.length
                  ? (selected: any) => renderSelectedItems(selected)
                  : () => <span style={{ color: '#BDBDBD' }}>Select item</span>
              }
              MenuProps={MenuProps}
              displayEmpty
              error={!!error}
              IconComponent={ExpandMore}
            >
              {renderSelectItems(options)}
            </Select>

            {error && (
              <FormHelperText
                error={!isEmpty(error.message)}
                sx={{ marginLeft: '14px', marginRight: '14px' }}
              >
                {error.message}
              </FormHelperText>
            )}
          </>
        );
      }}
    />
  );
};
