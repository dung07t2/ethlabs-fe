import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  TextField
} from '@mui/material';
import axios from 'axios';
import { Layout } from 'components';
import { useFormik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const CreateNewfeedPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const [images, setImages] = useState([]);
  const [contentUrl, setContentUrls] = useState([]);

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      link: '',
      contentUrls: [],
      imgUrls: []
    },
    validationSchema: Yup.object({
      title: Yup.string().trim().required('Title is required'),
      content: Yup.string().trim().required('Content is required'),
      link: Yup.string().trim().required('Link is required')
    }),

    onSubmit: async values => {
      try {
        const body = {
          ...values,
          postedBy: 'zLpccnYeG9ZLjddShrgEWciNJib2',
          contentUrls: contentUrl,
          imgUrls: images
        };
        const url = `${process.env.NEXT_PUBLIC_API_URL}newsFeed`;

        const response = await axios.post(url, body, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response && response.data && response.data.success) {
          resetForm();
          setImages([]);
          setContentUrls([]);
          setSubmitted(false);
          toast.success('Newfeed create successfully!');
          return;
        }
        toast.error('Newfeed create failed!');
        return;
      } catch (err) {
        toast.error('Newfeed create failed!');
        setSubmitted(false);
      }
    }
  });

  const { values, errors, touched, resetForm, handleChange, handleBlur } =
    formik;

  return (
    <Layout variant="auth" title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <div>
          <form onSubmit={formik.handleSubmit}>
            <Card>
              <CardHeader title="Create New Feed" />
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

                <Grid item xs={12} md={6}>
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

                <Grid item xs={12} md={6}>
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

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    pt: 2
                  }}
                >
                  <Button
                    color="primary"
                    disabled={submitted}
                    type="submit"
                    variant="contained"
                  >
                    Create
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </form>
        </div>
      </Container>
    </Layout>
  );
};

export default CreateNewfeedPage;
