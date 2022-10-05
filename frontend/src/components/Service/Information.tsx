import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toastError, toastSuccess } from "../../config/toast";
import { UPDATE_PROFILE_WITH_ID } from "../../query/user";
import Footer from "../Footer/Footer";

export default function Information(props: any) {
    const mode = props.mode;
    const navigate = useNavigate();
    const [updateFunc] = useMutation(UPDATE_PROFILE_WITH_ID);
    let id = props.id;
    const param = useParams();
    if (id === null || id === undefined || id === "") {
      id = param.id;
    }
  
    console.log("id : ", id);
  
    function handleSubmit(e: any) {
      e.preventDefault();
      const input = {
        name: e.target.firstName.value,
      };
      updateFunc({ variables: { input: input, id: id } })
        .then(() => {
          toastSuccess("Succesfully edit account!");
          if (mode === "google") {
            navigate("/home");
          } else {
            navigate("/login");
          }
        })
        .catch((err) => {
          toastError(err.message);
        });
    }

    return (
      <>
        <div className="center information-container bg-color-bg">
          <div className="flex flex-col">
            <form className="form mt-40" onSubmit={handleSubmit}>
              <div className="flex space-between">
                <h2>Tell us about you!</h2>
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="color-invic">
                  First Name
                </label>
                <input type="text" name="firstName" className="input-border" />
                <button type="submit" className="mt-5">
                  Submit
                </button>
              </div>
            </form>
            <Footer></Footer>
          </div>
        </div>
      </>
    );
  }