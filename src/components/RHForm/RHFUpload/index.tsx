import {
  Box,
  FormHelperText,
  Stack,
  styled,
  Theme,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FILE } from 'constants/common';
import { VALID } from 'constants/validate';
import { isArray, isEmpty, isFunction } from 'lodash';
import { useSnackbar } from 'notistack';
import React, { FC, useCallback } from 'react';
import Dropzone, { DropzoneOptions } from 'react-dropzone';
import { Controller } from 'react-hook-form';
import { RHFInputProps } from '..';

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  borderWidth: 2,
  padding: 4,
  borderRadius: 4,
  borderColor: '#DADADA',
  borderStyle: 'dashed',
  color: '#828282',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  marginTop: '12px',
  minHeight: '136px'
}));

const RootInnerStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100%'
}));

const ButtonStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 500,
  marginBottom: '8px',
  color: theme.palette.primary.main,
  borderRadius: 4,
  borderWidth: 1,
  borderColor: theme.palette.primary.main,
  borderStyle: 'solid',
  minHeight: '32px',
  minWidth: '110px'
}));

const ThumbStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  width: '100%'
}));

const ThumbItemStyle = styled('div')(({ theme }) => ({
  padding: 2,
  borderRadius: 4,
  border: '1px solid #eaeaea',
  margin: 4,
  width: 'calc(100% / 5 - 8px)'
}));

const useStyles = makeStyles((theme: Theme) => ({
  active: {
    borderColor: theme.palette.success.main
  },

  accept: {
    borderColor: '#00e676'
  },

  reject: {
    borderColor: theme.palette.error.main
  }
}));

interface RHFUploadProps extends DropzoneOptions, RHFInputProps {
  id?: string;
  name: string;
  onChangeCb?: (e) => void;
}

export const RHFUpload: FC<RHFUploadProps> = ({
  id,
  name,
  control,
  accept,
  multiple,
  onChangeCb,
  setValue,
  ...rest
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const fileSizeText = `File size: ${(FILE.LIMIT / 1048576).toFixed()}MB`;
  const fileTypeText = `File type: ${FILE.ACCEPT.replaceAll('image/', '.')}`;

  /**
   * showError
   */
  const showError = useCallback(() => {
    enqueueSnackbar(VALID.FILE_LIMIT, { variant: 'error' });
  }, [enqueueSnackbar]);

  return (
    <div id={id} className="upload">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, formState: { errors } }) => {
          const error = errors[name];
          return (
            <Dropzone
              onDrop={acceptedFiles => {
                onChange(acceptedFiles);
                acceptedFiles[0].size > FILE.LIMIT
                  ? showError()
                  : isFunction(onChangeCb) && onChangeCb(acceptedFiles);
              }}
              noDrag={!multiple}
              multiple={multiple ? multiple : false}
              accept={accept ? accept : FILE.ACCEPT}
              {...rest}
            >
              {({
                getRootProps,
                getInputProps,
                isDragActive,
                isDragAccept,
                isDragReject
              }) => {
                return (
                  <div className="upload">
                    <RootStyle
                      {...getRootProps({
                        className: `${
                          (isDragActive && classes.active,
                          isDragAccept && classes.accept,
                          (isDragReject || !isEmpty(error)) && classes.reject)
                        }`
                      })}
                    >
                      <input {...getInputProps()} />
                      {isEmpty(value) && (
                        <RootInnerStyle className="upload-form-inner">
                          {isDragActive ? (
                            <Typography variant="caption">
                              Drop the files here ...
                            </Typography>
                          ) : (
                            isEmpty(value) && (
                              <>
                                <ButtonStyle>Upload</ButtonStyle>
                                <Typography variant="caption">
                                  or drag and drop
                                </Typography>
                              </>
                            )
                          )}
                        </RootInnerStyle>
                      )}
                      {!!value?.length && (
                        <ThumbStyle>
                          {isArray(value) ? (
                            value.map(file => {
                              return (
                                <ThumbItemStyle key={file.name}>
                                  <figure className="thumbnail-centered thumbnail--1x1">
                                    <img
                                      src={URL.createObjectURL(file)}
                                      alt={file.name}
                                    />
                                  </figure>
                                </ThumbItemStyle>
                              );
                            })
                          ) : (
                            <ThumbItemStyle>
                              <figure className="thumbnail-centered thumbnail--1x1">
                                <img src={value} alt="thumbnail" />
                              </figure>
                            </ThumbItemStyle>
                          )}
                        </ThumbStyle>
                      )}
                    </RootStyle>
                    <Box display="flex" justifyContent="space-between">
                      {!isEmpty(error) && (
                        <FormHelperText error>
                          <span>{error.message}</span>
                        </FormHelperText>
                      )}
                      <Stack ml="auto" flexShrink={0} mt={0.5}>
                        <Typography
                          color="GrayText"
                          variant="caption"
                          align="right"
                          sx={{ ml: 'auto' }}
                        >
                          {`${fileSizeText} - ${fileTypeText}`}
                        </Typography>
                        <Typography
                          color="GrayText"
                          variant="caption"
                          align="right"
                          sx={{ ml: 'auto' }}
                        ></Typography>
                      </Stack>
                    </Box>
                  </div>
                );
              }}
            </Dropzone>
          );
        }}
      />
    </div>
  );
};
