export const register = async (req, res) => {
  const { fullname, email, password } = req.body;
  console.log("Username is ", fullname);
  console.log("Email is ", email);
  console.log("Password is ", password);
  res.status(201).json({ success: true, message: "User created successfully" });
};
export const getMessage = async (req, res) => {
  res.status(200).json({ success: true, message: "Welcome to the test route" });
};
