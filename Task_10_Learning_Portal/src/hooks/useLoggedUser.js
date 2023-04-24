import { useSelector } from "react-redux";

const useLoggedUser = () => {
  //const auth = useSelector((state) => state.auth);
  const auth = JSON.parse(localStorage?.getItem("auth"));

  if (auth?.accessToken && auth?.user) {
    return auth?.user;
  } else {
    return false;
  }
};

export default useLoggedUser;
