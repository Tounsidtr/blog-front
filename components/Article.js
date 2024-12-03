import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Article.module.css";
import Image from "next/image"; // Import de Image de Next.js
import { addArticle } from "../reducers/articles";

function Article(props) {

  const user = useSelector(state => state.user.value)
  const dispatch = useDispatch();

  // Fonction pour vérifier si l'URL est absolue ou relative
  const getImageSrc = (url) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;  // URL absolue, retourne telle quelle
    } else {
      // URL relative, on suppose que l'image se trouve dans le dossier public
      return `/images/${url}`;  // Utilise un chemin relatif (à partir du dossier public)
    }
  };

  const toggleFormEdit = () => {
    props.setAction("edit")
    props.setArticleToEdit({ title: props.title, content: props.content, imageUrl: props.imageUrl, id: props.id })
    if (props.action === "edit") {
      props.setShowForm(!props.showForm);
    }

  }

  const deleteArticle = async () => {
    const res = await fetch(`http://localhost:3001/articles/${props.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",

      },
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(addArticle(data.data));  // Ajouter l'article à Redux
    } else {
      const errorData = await res.json();
      console.error("Erreur lors de la suppression de l'article : ", errorData);
    }
  }

  return (
    <div className={styles.articles}>
      <div className={styles.articleHeader}>
        {/* Titre de l'article */}
        <h3>{props.title}</h3>
      </div>

      {/* Auteur de l'article */}
      <h4 style={{ textAlign: "right", color:"grey", fontWeight:"normal"}}>Auteur- {props.author}</h4>
      <div className={styles.divider}></div>

      {/* Conteneur pour l'image et la description */}
      <div className={styles.articleContent}>
        {/* Image de l'article */}
        {props.imageUrl && (
          <Image
            src={getImageSrc(props.imageUrl)}  // Applique la fonction pour obtenir le bon chemin de l'image
            alt={props.title}
            width={600}
            height={314}
            layout="intrinsic"
            className={styles.articleImage}
          />
        )}

        {/* Description ou contenu de l'article */}
        <p className={styles.articleText}>{props.content}</p>
        {
          props.authorId === user.id &&
          <>
            <button type="button" onClick={toggleFormEdit} className={styles["edit-button"]}>{(props.id === props.articleToEdit?.id) ? (props.action == "edit" && props.showForm) ? "Annuler" : "Edit" : "Edit"}</button>
            <button type="button" onClick={deleteArticle} className={styles["delete-button"]}>Supprimer</button>
          </>
        }
      </div>
    </div>
  );
}

export default Article;