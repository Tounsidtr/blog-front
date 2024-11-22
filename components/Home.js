import { useState } from "react";
import styles from "../styles/Home.module.css";
import Article from "./Article";
import FormComponent from "../components/FormComponent";
import Link from "next/link";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    imageUrl: "", // Ajout d'un champ pour l'URL de l'image
  });

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ajouter l'article avec l'URL de l'image
    setArticles([
      ...articles,
      {
        id: articles.length + 1,
        title: newArticle.title,
        content: newArticle.content,
        imageUrl: newArticle.imageUrl, // Stocker l'URL de l'image
      },
    ]);

    // Réinitialiser le formulaire
    setNewArticle({
      title: "",
      content: "",
      imageUrl: "", // Réinitialiser l'URL de l'image
    });
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewArticle({
      ...newArticle,
      [name]: value,
    });
  };

  // async function handleLogout() {
  //   const res = await fetch("http://localhost:3000/users/logout", {
  //     method: "POST",
  //     credentials: "include",
  //   });
  //   const data = await res.json();
  //   if (data.success) {
  //     setisUserConnected(false);
  //   }
  //   // dispatch(logout());
  // }
  const [isUserConnected, setisUserConnected] = useState(false);
  return (
    <div>
      {/* En-tête avec le titre */}
      <header className={styles.header}>
        <h1 className={styles.titleContainer}>Blog Of The Street</h1>
        <div>
          {!isUserConnected ? (
            <>
              <Link href="/logIn">
                <button className={styles.logBtn}> Se connecter</button>
              </Link>
              <p>ou</p>
              <Link href="/register">
                <button className={styles.logBtn}> S'incrire</button>
              </Link>
            </>
          ) : (
            <button className={styles.logoutBtn}> Se deconnecter</button>
          )}
        </div>
      </header>

      {/* Image d'arrière-plan */}
      <div className={styles.imageContainer}>
        <img
          src="https://i0.wp.com/www.amalgallery.com/wp-content/uploads/2024/08/street-art-bombe-aerosol-amal-gallery-art-blog.jpg?resize=1024%2C585&ssl=1/1920x400"
          alt="Description de l'image"
          className={styles.fullWidthImage}
        />
        <div className={styles.overlayText}>
          <h2>Laissez Parler Votre Art</h2>
          <p>
            Partagez et découvrez les articles les plus inspirants de la rue.
          </p>
        </div>
      </div>
      <div className={styles.divider}></div>

      {/* Contenu principal sous l'en-tête */}
      <div className={styles.mainContent}>
        <button onClick={toggleForm} className={styles.mainContentBtn}>
          {showForm ? "Annuler la création" : "Créer un article"}
        </button>
        {showForm && (
          <FormComponent handleChange={handleChange} newArticle={newArticle} />
        )}

        {/* Affichage des articles créés */}
        <div>
          <h2>Liste des articles :</h2>
          <div className={styles.articleList}>
            {articles.map((article) => (
              <Article
                key={article.id}
                title={article.title}
                content={article.content}
                imageUrl={article.imageUrl} // Passer l'URL de l'image
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
