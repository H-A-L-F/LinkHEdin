import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useLoading } from "../../hooks/useLoading";
import { GOOGLE_QUERY } from "../../query/google";
import { gapi } from "gapi-script";
import { toastError } from "../../config/toast";
import GoogleLogin from "react-google-login";

export default function MyGoogleLogin() {
    const googleClientID = "746923983555-nrc31quhoprcfb8vkm1divq0r05ki5js.apps.googleusercontent.com";
    const myGoogleKey = "googlelinkhedin";
    const navigate = useNavigate();
    const { setLoading } = useLoading();
    const { setUser } = useAuth();
    const [googleFunc] = useMutation(GOOGLE_QUERY);
  
    useEffect(() => {
      function start() {
        gapi.client.init({
          clientId: googleClientID,
          scope: "",
        });
      }
      gapi.load("client:auth2", start);
    }, []);
  
    function onSuccess(resp: any) {
      const googleObj = resp.profileObj;
      // console.log(resp);
      // console.log(googleObj);
      const obj = {
        name: resp.profileObj.name,
        email: resp.profileObj.email,
        googleId: resp.profileObj.googleId,
      };
      googleFunc({
        variables: {
          googleId: obj.googleId,
          googleKey: myGoogleKey,
          email: obj.email,
          name: obj.name,
        },
      })
        .then((resp) => {
          setLoading(false);
          const user = resp.data.google;
          setUser(user);
          navigate("/home");
        })
        .catch((err) => {
          setLoading(false);
          toastError(err.message);
        });
    }
  
    function onFailure(resp: any) {
      setLoading(false);
      toastError("Failed to login with google");
    }
  
    return (
      <div
        onClick={() => {
          setLoading(true);
        }}
        className="google-sign-in w-full"
      >
        <GoogleLogin
          className="google w-full align-items-center justify-center"
          clientId={googleClientID}
          buttonText="Login"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={false}
        ></GoogleLogin>
      </div>
    );
  }
  