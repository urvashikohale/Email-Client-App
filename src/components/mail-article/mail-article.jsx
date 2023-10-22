import React from "react";
import "./mail-article.css";
import { useSelector } from "react-redux";

export const MailArticle = ({ id, from, date, subject, short_description }) => {
  const state = useSelector((store) => store.emailList);

  return (
    <article
      className={`article ${state.opened.id === id ? "article-opened" : null} ${
        state.read.some((m) => m.id === id) ? "article-read" : null
      }`}
    >
      <div className="sender">
        <div className="sender-initial">
          {from.name.charAt(0).toUpperCase()}
        </div>
      </div>
      <div className="details">
        <div>
          <small>
            From:{" "}
            <strong>
              {from.name} &lt;{from.email}&gt;
            </strong>
          </small>
        </div>
        <div>
          <small>
            Subject: <strong>{subject}</strong>
          </small>
        </div>
        <div>
          <small>{short_description}</small>
        </div>
        <div className="details-bottom">
          <small>{`${new Date(date).toLocaleDateString()} ${new Date(
            date
          ).toLocaleTimeString()}`}</small>
          {state.favourite.some((m) => m.id === id) ? (
            <small className="favourite-tag">favourite</small>
          ) : null}
        </div>
      </div>
    </article>
  );
};
