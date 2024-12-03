import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import Article from "./Article";
import FormComponent from "./FormComponent";
import { logout } from "../reducers/user";
import { useRouter } from "next/router";
import { addArticle, setArticles } from "../reducers/articles";
import Cookies from "js-cookie";  // Import de js-cookie

export default function Home() {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articles);

  const [action, setAction] = useState("")
  const [articleToEdit, setArticleToEdit] = useState({});

  // useEffect(() => {
  //   console.log("ARTICLES => ", articles);
  //   articles.map(article => console.log(article)
  //   )
  // }, [articles])



  const [showForm, setShowForm] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });
  const [isUserConnected, setIsUserConnected] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();
  const user = useSelector(state => state.user.value);

  useEffect(() => {
    const checkUserConnection = async () => {
      const token = Cookies.get("jwt");  // Récupérer le token depuis les cookies

      try {
        const res = await fetch("http://localhost:3001/articles", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
          credentials: "include",  // Si vous avez des cookies de session à envoyer
        });

        if (res.ok) {
          const data = await res.json();

          dispatch(addArticle(data.data))
          if (data.isAuthenticated) {
            setIsUserConnected(true);
            setUsername(data.username);
          } else {
            setIsUserConnected(false);
          }
        } else {
          setIsUserConnected(false);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de la connexion :", error);
        setIsUserConnected(false);
      }

    };

    checkUserConnection();
  }, []);

  const toggleForm = () => {
    setArticleToEdit({ title: "", content: "", imageUrl: "" })
    setAction("post")
    if (action === "post") {

      setShowForm(!showForm);
    }
  };

  const handleSubmitArticle = async (articleData) => {
    const token = Cookies.get("jwt");  // Utilisation de Cookies.get pour récupérer le token
    console.log("Token récupéré:", token);

    if (!user.isConnected) {
      alert("Vous devez être connecté pour créer un article.");
      return;
    }

    const newArticleData = {
      title: articleData.title,
      content: articleData.content,
      imageUrl: articleData.imageUrl,

    };
    console.log(newArticleData);


    try {
      if (action === "post") {
        const res = await fetch("http://localhost:3001/articles/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",

          },
          credentials: "include",
          body: JSON.stringify(newArticleData),
        });

        if (res.ok) {
          const data = await res.json();
          dispatch(addArticle(data.data));  // Ajouter l'article à Redux
          setNewArticle({ title: "", content: "", imageUrl: "" });
          setShowForm(false);
        } else {
          const errorData = await res.json();
          console.error("Erreur lors de la création de l'article : ", errorData);
        }

      } else {
        const res = await fetch(`http://localhost:3001/articles/${articleToEdit.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",

          },
          credentials: "include",
          body: JSON.stringify(newArticleData),
        });

        if (res.ok) {
          const data = await res.json();
          dispatch(addArticle(data.data));  // Ajouter l'article à Redux
          setNewArticle({ title: "", content: "", imageUrl: "" });
          setArticleToEdit({ title: "", content: "", imageUrl: "" })
          setShowForm(false);
        } else {
          const errorData = await res.json();
          console.error("Erreur lors de la création de l'article : ", errorData);
        }
      }
    } catch (error) {
      console.error("Erreur réseau lors de la création de l'article :", error);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3001/users/logout", {
        method: "POST",
        credentials: "include",  // Assurez-vous d'envoyer les cookies
      });

      if (res.ok) {
        setIsUserConnected(false);
        dispatch(logout());
        Cookies.remove("jwt");  // Supprimer le cookie jwt
        router.push("/logIn");
      } else {
        console.error("Erreur lors de la déconnexion");
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.titleContainer}>Blog Of The Street</h1>
        <div>
          {user.isConnected ? (
            <div>
              <p>Bienvenue {username} !</p>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                Se déconnecter
              </button>
            </div>
          ) : (
            <div>
              <button onClick={() => router.push("/logIn")} className={styles.logBtn}>
                Se connecter
              </button>
              <button onClick={() => router.push("/register")} className={styles.logBtn}>
                S'inscrire
              </button>
            </div>
          )}
        </div>
      </header>

      <div className={styles.mainContent}>
        <button onClick={toggleForm} className={styles.mainContentBtn}>
          {showForm && action == "post" ? "Annuler la création" : "Créer un article"}
        </button>

        {showForm && (
          <FormComponent articleToEdit={articleToEdit} action={action} handleSubmitArticle={handleSubmitArticle} />
        )}

        <div>
          <h2>Liste des articles :</h2>
          {articles.length > 0 ? (
            <div className={styles.articleList}>
              {articles.map((article) => (
                <Article
                  key={article._id}
                  id={article._id}
                  authorId={article.author._id}
                  title={article.title}
                  author={article.author?.username}
                  content={article.content}
                  imageUrl={article.image}
                  setAction={setAction}
                  action={action}
                  setArticleToEdit={setArticleToEdit}
                  articleToEdit={articleToEdit}
                  setShowForm={setShowForm}
                  showForm={showForm}
                />
              ))}
            </div>
          ) : (
            <p>Aucun article disponible.</p>
          )}
        </div>
      </div>
    </div>
  );
}