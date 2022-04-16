import moment from "moment";
import jwt_decode from "jwt-decode";

//Decodificar token
const parseJwt = (token) => {
  try {
    const jsonPayload = jwt_decode(token);
    return jsonPayload;
  } catch (error) {
    return undefined;
  }
};

//Corroborar que token continúa siendo válido
const isTokenValid = (token) => {
  const data = parseJwt(token);

  if (data !== undefined) {
    return moment.unix(data.exp).isAfter(new Date());
  }

  return false;
};

//Corroboración directa para token de login (guardado como "token" en localStorage)
const isLoginTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!isTokenValid(token)) localStorage.removeItem("token");
  return isTokenValid(token);
};

export { isTokenValid, parseJwt, isLoginTokenValid };
