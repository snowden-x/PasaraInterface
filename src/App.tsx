import './App.css'
import UserInterface from './components/UserInterface/UserInterface'
import { CartProvider } from './components/UserInterface/CartProvider';

function App() {
  return (
    <CartProvider>
      <UserInterface />
    </CartProvider>
  );
}

export default App
