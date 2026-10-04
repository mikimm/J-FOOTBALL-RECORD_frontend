import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ setuserName }) => {
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
      fetch("http://127.0.0.1:8000/auth/check/", {
        credentials: "include",
      })
        .then((response) => {
          if (response.status === 200) {
            setIsAuthenticated(true);
            return response.json();
          } else {
            setIsAuthenticated(false);
            window.location.href = "/login/";
          }
        })
        .then((result) => {
          const txt = JSON.stringify(result, null, " ");
          let res = JSON.parse(txt);
          setuserName(res.username);
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

  // 🔄 Djangoからの返答を待っている間は、ローディング画面（または何も表示しない）にする
  // これにより、ログイン前の古いキャッシュ画面が一瞬見えるのを完全に防ぎます
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // または null
  }

  // 認証成功していれば、本来表示したいコンポーネントを表示
  return isAuthenticated ? <Outlet /> : null;
};

export default ProtectedRoute;
