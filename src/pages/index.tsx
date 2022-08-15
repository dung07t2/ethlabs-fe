import { Container } from '@mui/material';
import { Layout } from 'components';

export default function HomePage() {
  return (
    <Layout
      title="Quiz"
      description="From Unique Nail Quizzes To So Much More, Quizzes made with love at Garys Luxury"
    >
      <Container>
        <div style={{ marginBottom: '20px' }}>
          <h1>Garys Quizzes</h1>
          <p>
            From Unique Nail Quizzes To So Much More, Quizzes made with love at
            Garys Luxury
          </p>
        </div>
      </Container>
    </Layout>
  );
}
