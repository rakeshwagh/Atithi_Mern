import React, { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validateUsername = (input: string) => {
    setUsernameError(
      input.trim().length === 0 ? "Username cannot be empty" : null
    );
  };

  const validateEmail = (input: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailRegex.test(input) ? "Invalid email address" : null);
  };

  const validatePassword = (input: string) => {
    setPasswordError(
      input.length < 8 || input.length > 10
        ? "Password must be between 8 and 10 characters"
        : null
    );
  };

  const handleRegister = async () => {
    validateUsername(username);
    validateEmail(email);
    validatePassword(password);

    if (usernameError || emailError || passwordError) {
      return;
    }

    // Perform registration logic here
    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        alert("User created successfully!");
        window.location.href = "/login";
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              validateUsername(e.target.value);
            }}
            className={`w-full px-3 py-2 border ${
              usernameError ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {usernameError && (
            <p className="text-red-500 text-xs mt-1">{usernameError}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
            className={`w-full px-3 py-2 border ${
              emailError ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {emailError && (
            <p className="text-red-500 text-xs mt-1">{emailError}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            className={`w-full px-3 py-2 border ${
              passwordError ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {passwordError && (
            <p className="text-red-500 text-xs mt-1">{passwordError}</p>
          )}
        </div>

        <button
          onClick={handleRegister}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
