import React from "react";

const AuthButton = ({
  type,
  loading,
}: {
  type: "ログイン" | "新規登録" | "パスワードをリセット" | "パスワードを忘れた";
  loading: boolean;
}) => {
  return (
    <button
      disabled={loading}
      type="submit"
      className={`${
        loading ? "bg-gray-600" : "bg-blue-600"
      } rounded-md w-full px-12 py-3 text-sm font-medium text-white`}
    >
      {loading ? "Loading..." : type}
    </button>
  );
};

export default AuthButton;