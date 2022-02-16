const prod = {
  url: {
    stream: `${window.location.href}`,
    login: `${window.location.href}`,
    auth: `${window.location.href}`,
    register: `${window.location.href}`,
    newMsg: `${window.location.href}`,
  },
};
const dev = {
  url: {
    stream: "http://localhost:8080/chat/stream",
    login: "http://localhost:8080/user/login",
    auth: "http://localhost:8080/user/auth",
    register: "http://localhost:8080/user/register",
    newMsg: "http://localhost:8080/chat/new/msg",
  },
};

export const config = process.env.NODE_ENV === `development` ? dev : prod;
