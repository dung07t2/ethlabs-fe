import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import WarningIcon from '@mui/icons-material/Warning';
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import axios from 'axios';
import { DataNotFound, Layout } from 'components';
import { format } from 'date-fns';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const NewfeedPage = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const currentPage = 0;
  const rowsPerPage = 10;

  const getNews = async ({ from, to }) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}newsFeed/?filter={}&range=[${from},${to}]`
    );

    if (res && res.status === 200) {
      setData(res.data);
      setTotal(res.data.total);
    }
  };

  const paging = {
    from: 0,
    to: 9
  };

  useEffect(() => {
    getNews({ from: paging.from, to: paging.to });
  }, []);

  const [images, setImages] = useState([]);
  const [contentUrl, setContentUrls] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [newfeed, setNewfeed] = useState(null);

  const handleDelete = async () => {
    if (!newfeed || !newfeed.id) return null;
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}newsFeed/${newfeed?.id}`
      );
      if (res && res.status === 200) {
        setOpen(false);
        setNewfeed(null);
        toast.success('Newfeed delete successfully!');
        await getNews({ from: 0, to: 9 });
      }
    } catch (error) {
      toast.error('Newfeed delete failed!');
    }
  };

  const handleOpenDialog = data => {
    setOpen(true);
    setNewfeed(data);
  };

  const handleClose = () => {
    setOpen(false);
    setNewfeed(null);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handlePageChange = (_, newPage) => {
    const from = paging.from + newPage * rowsPerPage;
    const to = paging.to + newPage * rowsPerPage;
    getNews({ from, to: to });
  };

  const formik = useFormik({
    initialValues: {
      title: newfeed?.title || '',
      content: newfeed?.content || '',
      link: newfeed?.link || ''
    },
    validationSchema: Yup.object({
      title: Yup.string().trim().required('Title is required'),
      content: Yup.string().trim().required('Content is required'),
      link: Yup.string().trim().required('Link is required')
    }),
    onSubmit: async values => {
      try {
        if (!newfeed || !newfeed.id)
          return toast.error('Newfeed update failed!');
        const body = {
          ...values,
          contentUrls: contentUrl,
          imgUrls: images,
          postedBy: 'zLpccnYeG9ZLjddShrgEWciNJib2',
          postedAt: ''
        };
        const url = `${process.env.NEXT_PUBLIC_API_URL}newsFeed/${newfeed.id}`;

        const response = await axios.put(url, body, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response && response.data && response.status === 200) {
          resetForm();
          toast.success('Newfeed update successfully!');
          setOpenEdit(false);
          setNewfeed(null);
          return;
        }
        toast.error('Newfeed update failed!');
        return;
      } catch (err) {
        toast.error('Newfeed update failed!');
      }
    }
  });

  const {
    values,
    errors,
    touched,
    resetForm,
    handleChange,
    handleBlur,
    setFieldValue
  } = formik;

  const handleOpenEditDialog = data => {
    setNewfeed(data);
    const fields = ['title', 'content', 'link'];
    fields.forEach(field => setFieldValue(field, newfeed[field], false));
    setImages(newfeed['imgUrls']);
    setContentUrls(newfeed['imgcontentUrlsUrls']);
    setOpenEdit(true);
  };

  return (
    <Layout variant="auth" title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Newfeed</Typography>
        </Box>
        <Grid container spacing={3}>
          {data?.results && data?.results.length > 0 && (
            <>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Content</TableCell>
                    <TableCell>Link</TableCell>
                    <TableCell>Posted At</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.results.map(d => (
                    <TableRow key={d.id}>
                      <TableCell>{d.title}</TableCell>
                      <TableCell>{d.content}</TableCell>
                      <TableCell>{d.link}</TableCell>
                      <TableCell>
                        {format(
                          new Date(d.postedAt),
                          "MMM dd, yyyy 'at' hh:mm a"
                        )}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Edit Newfeed">
                          <IconButton
                            onClick={() => {
                              handleOpenEditDialog(d);
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            onClick={() => {
                              handleOpenDialog(d);
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={total}
                onPageChange={handlePageChange}
                page={currentPage}
                rowsPerPage={rowsPerPage}
              />
            </>
          )}
          {(!data || !data.results || data.results.length === 0) && (
            <DataNotFound />
          )}
        </Grid>
      </Container>

      <Dialog
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              pt: 3,
              pb: 2
            }}
          >
            <Box>
              <Typography color="textPrimary" variant="h5">
                Update newfeed
              </Typography>
              <Grid container spacing={2} mt={3}>
                <form onSubmit={formik.handleSubmit}>
                  <Card>
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            margin="normal"
                            error={Boolean(touched.title && errors.title)}
                            helperText={touched.title && errors.title}
                            label="Title"
                            name="title"
                            onChange={handleChange}
                            value={values.title ?? ''}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            margin="normal"
                            error={Boolean(touched.content && errors.content)}
                            helperText={touched.content && errors.content}
                            label="Content"
                            name="content"
                            onChange={handleChange}
                            value={values.content ?? ''}
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          margin="normal"
                          error={Boolean(touched.link && errors.link)}
                          helperText={touched.link && errors.link}
                          label="Link"
                          name="link"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.link ?? ''}
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Autocomplete
                          multiple
                          id="tags-filled"
                          options={[]}
                          defaultValue={[]}
                          freeSolo
                          value={images}
                          onChange={(_, v) => setImages(v)}
                          renderInput={(params: any) => (
                            <TextField
                              {...params}
                              label="Image Urls"
                              placeholder="Add image url by pressing enter"
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Autocomplete
                          multiple
                          id="tags-filled"
                          options={[]}
                          defaultValue={[]}
                          freeSolo
                          value={contentUrl}
                          onChange={(_, v) => setContentUrls(v)}
                          renderInput={(params: any) => (
                            <TextField
                              {...params}
                              label="Content Url"
                              placeholder="Add content url by pressing enter"
                            />
                          )}
                          sx={{ mt: 1 }}
                        />
                      </Grid>
                    </CardContent>
                  </Card>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      py: 2
                    }}
                  >
                    <Button
                      color="primary"
                      sx={{ mr: 2 }}
                      variant="outlined"
                      onClick={() => {
                        handleEditClose();
                      }}
                    >
                      Cancle
                    </Button>
                    <Button color="primary" type="submit" variant="contained">
                      Update
                    </Button>
                  </Box>
                </form>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Dialog>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              display: 'flex',
              pt: 3,
              pb: 2
            }}
          >
            <Avatar
              sx={{
                color: 'error.main',
                mr: 2
              }}
            >
              <WarningIcon />
            </Avatar>
            <Box>
              <Typography color="textPrimary" variant="h5">
                Delete newfeed
              </Typography>
              <Typography
                color="textSecondary"
                sx={{ mt: 1 }}
                variant="subtitle1"
              >
                {`Are you sure you want to delete this ${newfeed?.title}`}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  py: 2
                }}
              >
                <Button
                  color="primary"
                  sx={{ mr: 2 }}
                  variant="outlined"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Cancle
                </Button>
                <Button
                  sx={{
                    backgroundColor: 'error.main',
                    '&:hover': {
                      backgroundColor: 'error.dark'
                    }
                  }}
                  variant="contained"
                  onClick={() => {
                    handleDelete();
                  }}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Dialog>
    </Layout>
  );
};

export default NewfeedPage;
