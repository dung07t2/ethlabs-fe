import { Box, Container, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Layout } from 'components';
import { getAuth } from 'firebase/auth';
import { CardItem } from 'modules/Dashboard';

const DashboardPage = () => {
  const { isLoading, data } = useQuery(['repoData'], () =>
    fetch(`${process.env.NEXT_PUBLIC_API_URL}newsFeed?filter={}&range=[0,5]`).then(res => res.json())
  );

  const auth = getAuth();
  const { currentUser } = auth;

  return (
    <Layout variant="auth" title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        {currentUser && currentUser.email && (
          <>
            <Box sx={{ pb: 5 }}>
              <Typography variant="h4">Hi, {currentUser.email}</Typography>
            </Box>
          </>
        )}
        <Grid container spacing={3}>
          {isLoading && <p>Loading...</p>}
          {data?.results.map(item => (
            <Grid item key={item.id} sm={4}>
              <CardItem {...item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export default DashboardPage;
