import { useEffect } from "react";
import "./App.css";
import { MailArticle } from "./components/mail-article/mail-article";
import { Singlemail } from "./components/Single-mail/Singlemail";
import {
  getEmails,
  mailClicked,
  filter,
} from "./features/EmailListing/EmailListSlice";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmails());
  }, [dispatch]);

  const state = useSelector((store) => store.emailList);

  return state.isLoading ? (
    <p>loading....</p>
  ) : (
    <div className="APP">
      <div className="filter">
        <span>Filter by:</span>
        <button
          className={`btn-filter ${
            state.show === state.unread ||
            (state.show !== state.read && state.show !== state.favourite)
              ? "btn-active"
              : null
          }`}
          onClick={() => dispatch(filter("unread"))}
        >
          Unread
        </button>
        <button
          className={`btn-filter ${
            state.show === state.read ? "btn-active" : null
          }`}
          onClick={() => dispatch(filter("read"))}
        >
          Read
        </button>
        <button
          className={`btn-filter ${
            state.show === state.favourite ? "btn-active" : null
          }`}
          onClick={() => dispatch(filter("favourite"))}
        >
          Favourites
        </button>
      </div>
      <div className={state.opened ? "page" : null}>
        <div className={`App ${state.opened ? null : "padding"}`}>
          {state.show.map((email) => (
            <div
              key={email.id}
              onClick={() => {
                dispatch(mailClicked(email));
              }}
            >
              <MailArticle
                id={email.id}
                from={email.from}
                date={email.date}
                subject={email.subject}
                short_description={email.short_description}
              />
            </div>
          ))}
        </div>

        {state.opened && <Singlemail open={state.opened} />}
      </div>
    </div>
  );
}

export default App;
