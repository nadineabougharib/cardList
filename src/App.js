import { useEffect, useState, useContext } from "react";
import CardsLists from "./components/CardsLists";
import { SpinnerContext } from "./contexts/SpinnerContextProvider";
import { ModeContext } from "./contexts/ModeContextProvider";

import "./home.scss";
function App() {
  const { showSpinner } = useContext(SpinnerContext);
  const { submitMode, mode } = useContext(ModeContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();

    // eslint-disable-next-line
  }, []);

  const loadData = async () => {
    try {
      submitMode("view");
      showSpinner(true);
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((json) => setData(json))
        .then(() => showSpinner(false));
    } catch (err) {
      console.log(err.message, "err");
      showSpinner(false);
    }
  };
  const btnClicked = (mode) => {
    submitMode(mode);
  };

  const returnedObject = () => (object) => {
    if (mode === "add") {
      setData([...data, object]);
    } else {
      data.map((v) => {
        if (v.id == object.id) {
          v.name = object.name;
          v.phone = object.phone;
          v.email = object.email;
          v.website = object.website;
          v.address.city = object.address.city;
          v.address.street = object.address.street;
        }
      });
    }
    submitMode("view");
  };

  return (
    <div className="App">
      <header>
        <div className="marginLeft"></div>
        <div className="title">Profile Cards Lists</div>
        <div className="addUser">
          {mode === "view" ? (
            <button onClick={() => btnClicked("add")}> Add user </button>
          ) : (
            <button onClick={() => btnClicked("view")}>Show List</button>
          )}
        </div>
      </header>
      {mode === "view" && (
        <CardsLists onSubmit={returnedObject()} data={data} />
      )}
      {(mode === "add" || mode === "edit") && (
        <CardsLists onSubmit={returnedObject()} data={data} />
      )}
    </div>
  );
}

export default App;
