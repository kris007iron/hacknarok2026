import React, { useState } from "react";
import { type User, type UserRole } from "../types";

interface AuthPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, pass: string) => void;
  onRegister: (newUser: User) => void;
  isLoginView: boolean;
  setIsLoginView: (b: boolean) => void;
}

export const AuthPopup = ({
  isOpen,
  onClose,
  onLogin,
  onRegister,
  isLoginView,
  setIsLoginView,
}: AuthPopupProps) => {
  // Form State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    photo_url: "",
    role: "user" as UserRole,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoginView) {
      onLogin(formData.email, formData.password);
    } else {
      onRegister(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl z-10 mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl"
        >
          &times;
        </button>

        <h2 className="text-3xl font-black text-center mb-6 text-black">
          {isLoginView ? "Log In" : "Create Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginView && (
            <div className="flex gap-2">
              <input
                type="text"
                name="name"
                placeholder="First Name"
                className="w-1/2 p-3 bg-gray-100 rounded-xl border-2 border-transparent focus:border-green-500 outline-none transition-all"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="surname"
                placeholder="Last Name"
                className="w-1/2 p-3 bg-gray-100 rounded-xl border-2 border-transparent focus:border-green-500 outline-none transition-all"
                onChange={handleChange}
                required
              />
            </div>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full p-3 bg-gray-100 rounded-xl border-2 border-transparent focus:border-green-500 outline-none transition-all"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-100 rounded-xl border-2 border-transparent focus:border-green-500 outline-none transition-all"
            onChange={handleChange}
            required
          />

          {!isLoginView && (
            <>
              <input
                type="text"
                name="photo_url"
                placeholder="Profile Photo URL (optional)"
                className="w-full p-3 bg-gray-100 rounded-xl border-2 border-transparent focus:border-green-500 outline-none transition-all"
                onChange={handleChange}
              />
              <select
                name="role"
                className="w-full p-3 bg-gray-100 rounded-xl border-2 border-transparent focus:border-green-500 outline-none transition-all"
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="checker">Checker</option>
              </select>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl shadow-lg transition-transform active:scale-95 mt-4"
          >
            {isLoginView ? "LOG IN" : "SIGN UP"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          {isLoginView ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLoginView(!isLoginView)}
            className="ml-2 text-green-600 font-bold hover:underline"
          >
            {isLoginView ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
};
