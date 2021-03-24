import { useState, useContext } from "react";

import {
  faAddressCard,
  faEnvelope,
  faGlobe,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SpinnerContext } from "../contexts/SpinnerContextProvider";
import { ModeContext } from "../contexts/ModeContextProvider";
import "../cardsLists.scss";
function CardsLists(props) {
  const { showSpinner } = useContext(SpinnerContext);
  const { mode } = useContext(ModeContext);
  const [view, setView] = useState();
  const { data, onSubmit } = props;
  const [pageInputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    street: "",
    phone: "",
    website: "",
    id: "",
  });
  const [err, setErr] = useState(false);

  const submit = () => {
    console.log(pageInputs);
    try {
      if (
        !pageInputs.firstName ||
        !pageInputs.lastName ||
        !pageInputs.city ||
        !pageInputs.street ||
        !pageInputs.phone ||
        !pageInputs.email ||
        !pageInputs.website
      ) {
        return setErr(true);
      }
      showSpinner(true);
      fetch(`https://jsonplaceholder.typicode.com/users/${pageInputs.id}`, {
        method: mode === "add" ? "POST" : "PUT",
        body: JSON.stringify({
          name: `${pageInputs.firstName} ${pageInputs.lastName}`,
          email: pageInputs.email,
          phone: pageInputs.phone,
          address: { street: pageInputs.street, city: pageInputs.city },
          website: pageInputs.website,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => onSubmit(json))
        .then(() => showSpinner(false))
        .then(() => setView("view"));
    } catch (err) {
      console.log(err, "err");
      showSpinner(false);
    }
  };
  const clear = () => {
    setInputs({
      firstName: "",
      lastName: "",
      email: "",
      city: "",
      street: "",
      phone: "",
      website: "",
      id: pageInputs.id,
    });
    setErr(false);
  };
  const update = (param) => {
    setInputs({
      firstName: param.name.split(" ")[0],
      lastName: param.name.split(" ")[1],
      email: param.email,
      city: param.address.city,
      street: param.address.street,
      phone: param.phone,
      website: param.website,
      id: param.id,
    });
    setView("edit");
  };

  return (
    <div className="container">
      {data &&
        mode === "view" &&
        view !== "edit" &&
        data.map((v) => (
          <div onClick={() => update(v)} key={v.id} className="cards">
            <div className="profile">
              <div className="initilals">
                <div>
                  {v.name.split(" ")[0]?.substring(0, 1)}
                  {v.name.split(" ")[1]?.substring(0, 1)}
                </div>
              </div>
            </div>
            <div className="userDetails">
              <div className="title">{v.name}</div>
              <div>
                <FontAwesomeIcon icon={faEnvelope} /> {v.email}
              </div>
              <div>
                <FontAwesomeIcon icon={faAddressCard} /> {v.address.city},{" "}
                {v.address.street}
              </div>

              <div>
                <FontAwesomeIcon icon={faPhone} /> {v.phone}
              </div>
              <div className="website">
                <FontAwesomeIcon icon={faGlobe} /> {v.website}
              </div>
            </div>
          </div>
        ))}
      {(mode === "add" || view === "edit") && (
        <div
          className="cards"
          style={{ boxShadow: "none", width: "100%", height: "600px" }}
        >
          <div className="profile">
            <div className="initilals">
              <div>
                {pageInputs.firstName?.substring(0, 1)}
                {pageInputs.lastName?.substring(0, 1)}
              </div>
            </div>
          </div>
          <div className="userDetailsModif">
            <div className="title">
              {" "}
              First Name:{" "}
              <input
                name="firstName"
                value={pageInputs.firstName}
                style={{
                  border: !pageInputs.firstName && err && "1px solid red",
                }}
                onChange={({ target }) =>
                  setInputs((state) => ({
                    ...state,
                    firstName: target.value,
                  }))
                }
              />{" "}
            </div>
            <div className="title">
              {" "}
              Last Name:{" "}
              <input
                name="lastName"
                value={pageInputs.lastName}
                style={{
                  border: !pageInputs.lastName && err && "1px solid red",
                }}
                onChange={({ target }) =>
                  setInputs((state) => ({ ...state, lastName: target.value }))
                }
              />
            </div>
            <div>
              <FontAwesomeIcon icon={faEnvelope} /> email:{" "}
              <input
                name="email"
                value={pageInputs.email}
                type="email"
                style={{
                  border: !pageInputs.email && err && "1px solid red",
                }}
                onChange={({ target }) =>
                  setInputs((state) => ({ ...state, email: target.value }))
                }
              />
            </div>
            <div>
              <FontAwesomeIcon icon={faAddressCard} /> city:{" "}
              <input
                name="city"
                value={pageInputs.city}
                style={{
                  border: !pageInputs.city && err && "1px solid red",
                }}
                onChange={({ target }) =>
                  setInputs((state) => ({ ...state, city: target.value }))
                }
              />
            </div>

            <div>
              <FontAwesomeIcon icon={faAddressCard} /> street:
              <input
                name="street"
                value={pageInputs.street}
                onChange={({ target }) =>
                  setInputs((state) => ({ ...state, street: target.value }))
                }
                style={{
                  border: !pageInputs.street && err && "1px solid red",
                }}
              />
            </div>

            <div>
              <FontAwesomeIcon icon={faPhone} /> phone:{" "}
              <input
                name="phone"
                type="tel"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                style={{
                  border: !pageInputs.phone && err && "1px solid red",
                }}
                value={pageInputs.phone}
                onChange={({ target }) =>
                  setInputs((state) => ({ ...state, phone: target.value }))
                }
              />
            </div>
            <div className="website">
              <FontAwesomeIcon icon={faGlobe} /> website{" "}
              <input
                name="website"
                value={pageInputs.website}
                style={{
                  border: !pageInputs.website && err && "1px solid red",
                }}
                onChange={({ target }) =>
                  setInputs((state) => ({ ...state, website: target.value }))
                }
              />
            </div>
            <div className="btnFooter">
              <div>
                <button onClick={() => clear()} className="clear">
                  clear
                </button>
              </div>
              <div>
                <button onClick={() => submit()} className="accept">
                  ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardsLists;
