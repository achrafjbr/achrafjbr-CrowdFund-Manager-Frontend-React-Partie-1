import { Provider } from "react-redux";
import "./App.css";
import store from "./store/store";
import Routing from "./Routing/Routing";

function App() {
  return (
    <Provider store={store}>
      <Routing />
    </Provider>
  );
}

export default App;
