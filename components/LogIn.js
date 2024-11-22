import React, { useState } from "react";
import { useForm } from "react-hook-form";

function LogIn() {
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register: connectForm,
    handleSubmit: handleConnectForm,
    formState: { errors: connectFormError },
    reset: resetConnectForm,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();

      if (result.success) {
        dispatch(LogIn(data.username)); // Connecter l'utilisateur dans Redux
        console.log("Connexion réussie !");
      } else {
        setErrorMsg(result.message || "Erreur de connexion");
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      setErrorMsg("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div>
      <h2>Se connecter</h2>
      <form onSubmit={handleConnectForm(onSubmit)}>
        <div>
          <label htmlFor="username">Nom d'utilisateur :</label>
          <input
            id="username"
            {...connectForm("username", {
              required: "Nom d'utilisateur est requis",
            })}
          />
          {connectFormError.username && (
            <span>{connectFormError.username.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="password">Mot de passe :</label>
          <input
            id="password"
            type="password"
            {...connectForm("password", {
              required: "Le mot de passe est requis",
            })}
          />
          {connectFormError.password && (
            <span>{connectFormError.password.message}</span>
          )}
        </div>
        <button type="submit">Se connecter</button>
      </form>
      <p>{errorMsg}</p>
    </div>
  );
}
export default LogIn;
