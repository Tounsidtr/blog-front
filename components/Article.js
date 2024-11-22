import styles from "../styles/Article.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Assurez-vous d'importer ceci
import Image from "next/image"; // Si tu utilises Next.js, sinon importation d'Image standard

function Article(props) {
  return (
    <div className={styles.articles}>
      <div className={styles.articleHeader}>
        {/* Titre de l'article */}
        <h3>{props.title}</h3>
      </div>
      {/* Auteur de l'article */}
      <h4 style={{ textAlign: "right" }}>- {props.author}</h4>
      <div className={styles.divider}></div>

      {/* Conteneur pour l'image et la description */}
      <div className={styles.articleContent}>
        {/* Image de l'article */}
        {props.imageUrl && (
          <Image
            src={props.imageUrl}
            alt={props.title}
            width={600}
            height={314}
            layout="intrinsic"
            className={styles.articleImage}
          />
        )}

        {/* Description ou contenu de l'article */}
        <p className={styles.articleText}>{props.content}</p>
      </div>
    </div>
  );
}

export default Article;
