import React, { useEffect, useState } from "react";
import "./singlemail.css";
import {
  addToFavourite,
  removeFromFavourite,
} from "../../features/EmailListing/EmailListSlice";
import { useDispatch, useSelector } from "react-redux";

export const Singlemail = ({ open }) => {
  const [data, setData] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `https://flipkart-email-mock.now.sh/?id=${open.id}`
      );
      const ress = await res.json();
      setData(ress.body);
    })();
  }, [open.id]);

  const dispatch = useDispatch();

  const state = useSelector((store) => store.emailList);

  return (
    <div className="mail-body-1">
      <div>
        <div className="sender-initial">
          {open.from.name.charAt(0).toUpperCase()}
        </div>
      </div>
      <div className="mail-body-2">
        <div className="mail-body-top">
          <div className="mail-body-top-1">
            <h2>{open.subject}</h2>
            <small>{`${new Date(open.date).toLocaleDateString()} ${new Date(
              open.date
            ).toLocaleTimeString()}`}</small>
          </div>

          {state.favourite.some((m) => m.id === open.id) ? (
            <button
              className="btn-fav"
              onClick={() => dispatch(removeFromFavourite(open))}
            >
              <small>Unmark as favourite</small>
            </button>
          ) : (
            <button
              className="btn-fav"
              onClick={() => dispatch(addToFavourite(open))}
            >
              <small>Mark as favourite</small>
            </button>
          )}
        </div>

        <div dangerouslySetInnerHTML={{ __html: data }} />
      </div>
    </div>
  );
};
