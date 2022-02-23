import { FormikHelpers } from "formik";
import { LoginIniValues } from "pages/login";
import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import rootReducer, { RootInitState, RootStateType } from "reducers";
import axiosInstance from "utils/axiosInstance";
import { useRouter } from "next/router";

type AuthDispatchType = {
  login: (
    values: typeof LoginIniValues,
    action: FormikHelpers<typeof LoginIniValues>
  ) => Promise<void>;
};

type AuthContextType = RootStateType & AuthDispatchType;

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, RootInitState);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("@token");
    if (token) {
      dispatch({ type: "AUTH_SUCCESS", payload: JSON.parse(token) });
    } else {
      dispatch({ type: "AUTH_RESET" });
    }
  }, []);

  const login = useCallback(
    async (
      values: typeof LoginIniValues,
      action: FormikHelpers<typeof LoginIniValues>
    ) => {
      try {
        dispatch({ type: "AUTH_REQUEST" });
        const { remember_me, ...rest } = values;
        const res = await axiosInstance.post<AuthResponse>("login", rest);
        dispatch({ type: "AUTH_SUCCESS", payload: res.data });
        sessionStorage.setItem("@token", JSON.stringify(res.data));
        action.resetForm();
        router.push("/");
      } catch (error) {
        action.setErrors({});
        dispatch({ type: "AUTH_FAIL", error: error as Error });
      } finally {
        action.setSubmitting(false);
      }
    },
    [router]
  );

  return (
    <AuthContext.Provider value={{ login, ...state }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
