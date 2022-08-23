import React from 'react'
import ReactLoading from "react-loading";
import "./loading.scss";

export default function Loading({ loading }: { loading: boolean }) {
  return (
    <React.Fragment>
      <div className={`lightbox ${loading ? "" : "hide-lightbox"}`} />
      {loading &&
        <ReactLoading
          className="loading-react-loading"
          type="bars"
          color="white"
          height={"10%"}
          width={"10%"}
        ></ReactLoading>
      }
    </React.Fragment>
  )
}
