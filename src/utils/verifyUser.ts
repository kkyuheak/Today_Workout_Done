import { getAuthUser } from "../api/Auth";
import { useAuth } from "../stores/authStore";

const setUser = useAuth.getState().setUser;
const login = useAuth.getState().login;
const logout = useAuth.getState().logout;

export const verifyUser = async () => {
  const { status, data } = await getAuthUser();
  if (!data) {
    logout();
    return;
  }
  if (status === 200) {
    setUser(data);
    login();
  }
};
