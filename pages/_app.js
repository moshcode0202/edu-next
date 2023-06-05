import '@/styles/tailwind.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
import store from '@/store/store';
import Site from '@/components/Layout/Site';
import { Toaster } from 'react-hot-toast';

const MyApp = ({ Component, pageProps }) => {
    return (
        <Provider store={store}>
            <Head>
                <title>EDU Raiser</title>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <Site layout={Component?.layout || 'default'} middleware={Component?.middleware}>
                <Component {...pageProps} />
            </Site>

            <Toaster position="top-center" toastOptions={{ duration: 3000, icon: false }} />
        </Provider>
    );
};

export default MyApp;
