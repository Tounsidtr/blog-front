import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import styles from "../styles/Login.module.css";

function LogIn() {
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const {
    register: connectForm,
    handleSubmit: handleConnectForm,
    formState: { errors: connectFormError },
    // reset: resetConnectForm,
  } = useForm({
    mode: "onBlur",
  });

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3001/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.username, // Utilisation de 'email' au lieu de 'username'
          password: data.password,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.result) {
        dispatch(login({username: result.data.username, id: result.data._id})); // Connecter l'utilisateur dans Redux
        console.log("Connexion réussie !");

        router.push("/");
      } else {
        setErrorMsg(result.message || "Erreur de connexion");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setErrorMsg("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className={styles["login-container"]}>
      <h2 className={styles["login-title"]}>Se connecter</h2>
      <form onSubmit={handleConnectForm(onSubmit)} className={styles["login-form"]}>
        <div className={styles["form-group"]}>
          <label htmlFor="username" className={styles["form-label"]}>Email :</label>
          <input
            id="username"
            className={styles["form-input"]}
            {...connectForm("username", {
              required: "L'email est requis",
            })}
          />
          {connectFormError.username && (
            <span className={styles["error-message"]}>{connectFormError.username.message}</span>
          )}
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="password" className={styles["form-label"]}>Mot de passe :</label>
          <input
            id="password"
            type="password"
            className={styles["form-input"]}
            {...connectForm("password", {
              required: "Password required",
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must contain at least 1 upper case letter, 1 lower case letter, 1 number and 1 special character",
              },
            }
        )}
          />
          {connectFormError.password && (
            <span className={styles["error-message"]}>{connectFormError.password.message}</span>
          )}
        </div>
        <button type="submit" className={styles["login-button"]}>Se connecter</button>
      </form>
      <p className={styles["global-error"]}>{errorMsg}</p>
    </div>
  );
}
export default LogIn;
