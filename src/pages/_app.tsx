import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import NextNprogress from 'nextjs-progressbar';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import { EnvUtility } from '@app/utilities/env.utility';
import { AnalyticUtility } from '@app/utilities/analytic.utility';
import { ThemeProvider } from '@mui/material/styles';
import React, { PropsWithChildren } from 'react';
import { ColorModeProvider, useColorMode } from '@app/utilities/hooks/ColorModeContainer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: EnvUtility.isProd(),
      refetchIntervalInBackground: EnvUtility.isProd(),
      refetchOnWindowFocus: EnvUtility.isProd(),
    },
  },
});

const AppProviders: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { theme } = useColorMode();
  return (
    <ThemeProvider theme={theme}>
      <DefaultSeo defaultTitle="Best Accessories" description="A page with examples of accessories" />
      <CssBaseline />
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
      <NextNprogress
        color="#64943E"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        options={{ showSpinner: false }}
      />
    </ThemeProvider>
  );
};

export default function MyApp({ Component, pageProps }: AppProps) {
  AnalyticUtility.useTracker();

  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeProvider>
        <AppProviders>
          <Component {...pageProps} />
        </AppProviders>
      </ColorModeProvider>
    </QueryClientProvider>
  );
}
