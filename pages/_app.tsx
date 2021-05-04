import { ChakraProvider } from "@chakra-ui/react"
import { StoreContext } from 'storeon/react'
import { store } from '../store'

import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => (
  <StoreContext.Provider value={store}>
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  </StoreContext.Provider>
)

export default MyApp;
