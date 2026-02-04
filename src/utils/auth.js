export const getUsers = () => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

export const addUser = (user) => {
  const users = getUsers();
  if (users.find((u) => u.username === user.username)) {
    return { success: false, message: "Username already exists" };
  }
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  return { success: true, message: "User registered successfully" };
};

export const validateUser = (username, password) => {
  const users = getUsers();
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    return { success: true, user };
  }
  return { success: false, message: "Invalid username or password" };
};

export const startSession = (user) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const getSession = () => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

export const endSession = () => {
  localStorage.removeItem("currentUser");
};
