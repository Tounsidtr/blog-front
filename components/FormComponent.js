import styles from "../styles/FormComponent.module.css";
import { useForm } from "react-hook-form";

function FormComponent({ action, articleToEdit, handleChange, newArticle, handleSubmitArticle }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    console.log("Formulaire soumis avec ces données : ", data);
    handleSubmitArticle(data); // Soumettre directement les données au parent
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div>
        <label htmlFor="title" className={styles.label}></label>
        <input
          type="text"
          name="title"
          id="title"
          required
          className={styles.input}
          placeholder="Titre"
          defaultValue={articleToEdit.title !== "" ? articleToEdit.title : ""}
          {...register("title", { required: "Le titre est requis" })}
        />
        {errors.title && <span>{errors.title.message}</span>}
      </div>
      <div>
        <label htmlFor="imageUrl" className={styles.label}></label>
        <input
          type="text"
          name="imageUrl"
          id="imageUrl"
          required
          className={styles.input}
          placeholder="Image"
          defaultValue={articleToEdit.imageUrl !== "" ? articleToEdit.imageUrl : ""}
          {...register("imageUrl", {
            required: "L'URL de l'image est requise",
          })}
        />
        {errors.imageUrl && <span>{errors.imageUrl.message}</span>}
      </div>
      <div>
        <label htmlFor="content" className={styles.label}></label>
        <textarea
          name="content"
          id="content"
          required
          className={styles.textarea}
          placeholder="Description"
          defaultValue={articleToEdit.content !== "" ? articleToEdit.content : ""}
          {...register("content", { required: "Le contenu est requis" })}
        />
        {errors.content && <span>{errors.content.message}</span>}
      </div>
      <button type="submit" className={styles.createArticleBtn}>
        {action === 'post' ? "Créer" : "Modifier"} l'article
      </button>
    </form>
  );
}

export default FormComponent;