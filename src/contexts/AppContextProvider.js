import { createContext, useEffect } from 'react';
import api from '../services/api';

export const AppContext = createContext(); // criação no app para páginas a escutarem

const AppContextProvider = ({ children }) => {
  // state para renderizar na aplicação
  const setData = data => localStorage.setItem('data', JSON.stringify(data));
  const data = JSON.parse(localStorage.getItem('data'));

  // pega dados do BD ao entrar na aplicação
  const FetchData = async () => {
    try {
      await api.get().then(res => setData(res.data));
    } catch {
      alert('Um erro inesperado ocorreu!');
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <AppContext.Provider value={[data, FetchData, setData]}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContextProvider;
