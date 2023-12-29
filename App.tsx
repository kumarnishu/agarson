import {
  StatusBar,
} from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChoiceProvider } from './src/contexts/ModalContext';
import { UserContext, UserProvider } from './src/contexts/UserContext';
import { PrivateStackNavigation, PublicStackNavigation } from './Navigation';
import { useContext } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, createTheme } from '@rneui/themed';
import { LocationProvider } from './src/contexts/LocationContext';
import NavBar from './src/components/NavBar';
import { NavigationContainer } from '@react-navigation/native';



const theme = createTheme({
  lightColors: {
    primary: 'red',
  },
  darkColors: {
    primary: 'blue',
  },
  components: {
    Button: {
      raised: true,
    },
  },
});

function Main() {
  const { user } = useContext(UserContext)
  return (
    <>
      <StatusBar />
      {user ?
        <>
          <SafeAreaProvider>
            <NavBar />
            <PrivateStackNavigation />
          </SafeAreaProvider>
        </> :
        <SafeAreaProvider>
          <PublicStackNavigation />
        </SafeAreaProvider>
      }
    </>
  );
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: true,
      refetchOnMount: true,
      retry: false,
      staleTime: 200
    }
  }
});

function App() {
  return (
    <LocationProvider>
      <QueryClientProvider client={queryClient}>
        <ChoiceProvider>
          <UserProvider>
            <ThemeProvider theme={theme}>
              <NavigationContainer>
                <Main />
              </NavigationContainer>
            </ThemeProvider>
          </UserProvider>
        </ChoiceProvider>
      </QueryClientProvider>
    </LocationProvider>
  )
}

export default App;
