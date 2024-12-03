import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import styles from "../styles/Register.module.css"

function Register() {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  
  const router = useRouter();

  const {
    register: registerForm,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerFormError },
    reset: resetRegisterForm,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3001/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",  // Ajouter cette ligne pour envoyer les cookies
      });
  
      // Vérifiez la réponse HTTP
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
  
      if (result.result) {
        setSuccessMsg("Inscription réussie !");
        setErrorMsg("");  // Réinitialise le message d'erreur
        console.log(result); // Vous pouvez rediriger l'utilisateur ou effectuer d'autres actions

        router.push("/logIn");
      } else {
        setErrorMsg(result.error || "Erreur lors de l'inscription");
        setSuccessMsg(""); // Réinitialise le message de succès
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      setErrorMsg("Une erreur est survenue. Veuillez réessayer.");
      setSuccessMsg(""); // Réinitialise le message de succès
    }
  };

  return (
    <div className={styles["register-container"]}>
      <h2 className={styles["register-title"]}>S'inscrire</h2>
      <form onSubmit={handleRegisterSubmit(onSubmit)} className={styles["register-form"]}>
        <div className={styles["form-group"]}>
          <label htmlFor="username" className={styles["form-label"]}>Nom d'utilisateur :</label>
          <input
            id="username"
            className={styles["form-input"]}
            {...registerForm("username", {
              required: "Nom d'utilisateur est requis",
            })}
          />
          {registerFormError.username && (
            <span className={styles["error-message"]}>{registerFormError.username.message}</span>
          )}
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="email" className={styles["form-label"]}>Email :</label>
          <input
            id="email"
            type="email"
            className={styles["form-input"]}
            {...registerForm("email", { required: "Email est requis" })}
          />
          {registerFormError.email && (
            <span className={styles["error-message"]}>{registerFormError.email.message}</span>
          )}
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="password" className={styles["form-label"]}>Mot de passe :</label>
          <input
            id="password"
            type="password"
            className={styles["form-input"]}
            {...registerForm("password", {
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
          {registerFormError.password && (
            <span className={styles["error-message"]}>{registerFormError.password.message}</span>
          )}
        </div>
        <button type="submit" className={styles["register-button"]}>S'inscrire</button>
      </form>
      {errorMsg && <p style={{ color: "red" }} className={styles["global-error"]}>{errorMsg}</p>}
      {successMsg && <p style={{ color: "green" }} className={styles["global-success"]}>{successMsg}</p>}
    </div>
  );
}

export default Register;
