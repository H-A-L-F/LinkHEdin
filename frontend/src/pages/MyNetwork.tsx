import React from "react";
import Invitation from "../components/MyNetwork/Invitation";
import { useAuth } from "../hooks/useAuth";

export default function MyNetwork() {
  const { user } = useAuth()

  return (
    <Invitation />
  );
}
