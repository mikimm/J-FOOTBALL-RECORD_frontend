import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null: 確認中, true: ログイン済, false: 未ログイン

  useEffect(() => {
    // 1. 【戻るボタン対策】（これは毎回登録されても問題ありません）
    const handlePageshow = (event) => {
      if (event.persisted) {
        window.location.reload();
      }
    };
    window.addEventListener("pageshow", handlePageshow);

    const checkAuthStatus = async () => {
      fetch("/auth/check/", {
        credentials: "same-origin",
      })
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            setIsAuthenticated(true);
          } else {
            console.log(response);
            setIsAuthenticated(false);
            window.location.href = "/login/";
          }
        })
        .catch((error) => {
          // 401 Unauthorized などが返ってきた＝ログアウト状態、またはCookieが無効
          setIsAuthenticated(false);
          window.location.href = "/login/";
        });
    };

    checkAuthStatus();

    return () => {
      window.removeEventListener("pageshow", handlePageshow);
    };
  }, [navigate]);

  console.log("protected route");
  // 🔄 Djangoからの返答を待っている間は、ローディング画面（または何も表示しない）にする
  // これにより、ログイン前の古いキャッシュ画面が一瞬見えるのを完全に防ぎます
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // または null
  }

  // 認証成功していれば、本来表示したいコンポーネントを表示
  return isAuthenticated ? <Outlet /> : null;
};

export default ProtectedRoute;
