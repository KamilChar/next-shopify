import useMediaQuery from '@mui/material/useMediaQuery';
import { theme } from '@app/utilities/styles/layout/layoutStyles';
import { MobileLayout } from '@app/components/layouts/default-layout/mobileLayout';
import { DesktopLayout } from '@app/components/layouts/default-layout/desktopLayout';
import { UseBaseQueryResult } from 'react-query';
import { Alert, Button, Container } from '@mui/material';

interface Props {
  query?: UseBaseQueryResult;
  children: React.ReactNode;
}

const DefaultLayout: React.FC<Props> = ({ query, children }) => {
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      {matches ? <MobileLayout /> : <DesktopLayout />}
      <Container sx={{ padding: { xs: '20px 12px 30px 12px', sm: '20px 24px 30px 24px' } }}>
        {(() => {
          if (query) {
            if (query.isError) {
              return (
                <Alert
                  sx={{ marginBottom: '20px' }}
                  variant="filled"
                  severity="error"
                  action={
                    <Button color="inherit" size="small" onClick={() => query?.refetch()}>
                      Refetch
                    </Button>
                  }
                >
                  Could not load the page!
                </Alert>
              );
            }

            return query.isSuccess ? children : '';
          } else {
            return children;
          }
        })()}
      </Container>
    </>
  );
};

export { DefaultLayout };
