import styles from "../styles/FormComponent.module.css";
import { useForm } from "react-hook-form";

function FormComponent({ handleChange, newArticle }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetConnectForm,
  } = useForm({
    mode: "onBlur",
  });
  const signup= (data)=>{
console.log(data);

  }
  return (
    <form onSubmit={handleSubmit(signup)}  className={styles.form}>
      <div>
        <label htmlFor="title" className={styles.label}></label>
        <input
          type="text"
          name="title"
          id="title"
          required
          className={styles.input}
          placeholder="Titre"
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
          {...register("content", { required: "Le contenu est requis" })}
        />
        {errors.content && <span>{errors.content.message}</span>}
      </div>
      <button type="submit" className={styles.createArticleBtn}>
        Créer l'article
      </button>
    </form>
  );
}

export default FormComponent;
