import React, { useState } from "react";
import { useForm } from "react-hook-form";

function Register() {
  const [errorMsg, setErrorMsg] = useState("");

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
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        });
        const result = await response.json();
  
        if (result.success) {
          console.log(result);
        } else {
          setErrorMsg(result.message || "Erreur de connexion");
        }
      } catch (error) {
        console.error("Erreur de connexion:", error);
        setErrorMsg("Une erreur est survenue. Veuillez réessayer.");
      }
    console.log("Inscription", data);
  };

  return (
    <div>
      <h2>S'inscrire</h2>
      <form onSubmit={handleRegisterSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">Nom d'utilisateur :</label>
          <input
            id="username"
            {...registerForm("username", {
              required: "Nom d'utilisateur est requis",
            })}
          />
          {registerFormError.username && (
            <span>{registerFormError.username.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="email">Email :</label>
          <input
            id="email"
            type="email"
            {...registerForm("email", { required: "Email est requis" })}
          />
          {registerFormError.email && (
            <span>{registerFormError.email.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="password">Mot de passe :</label>
          <input
            id="password"
            type="password"
            {...registerForm("password", {
              required: "Le mot de passe est requis",
            })}
          />
          {registerFormError.password && (
            <span>{registerFormError.password.message}</span>
          )}
        </div>
        {/* <div>
          <label htmlFor="confirmPassword">Confirmer le mot de passe :</label>
          <input
            id="confirmPassword"
            type="password"
            {...registerForm("confirmPassword", {
              required: "La confirmation du mot de passe est requise",
              validate: (value) =>
                value === registerForm.password ||
                "Les mots de passe ne correspondent pas",
            })}
          />
          {registerFormError.confirmPassword && (
            <span>{registerFormError.confirmPassword.message}</span>
          )}
        </div> */}
        <button type="submit">S'inscrire</button>
      </form>
      <p>{errorMsg}</p>
    </div>
  );
}

export default Register;
