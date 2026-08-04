import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "4rem",
      }}
    >
      <h1>404</h1>

      <h2>Page Not Found</h2>

      <p>
        Sorry, the page you are looking for does not exist.
      </p>

      <Link to="/" className="btn">
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFoundPage;