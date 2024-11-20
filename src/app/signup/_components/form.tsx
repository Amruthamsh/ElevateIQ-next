"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Form = ({ role }: { role: string }) => {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (data.fullname && data.username && data.password && data.role) {
      fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((err) => {
              throw new Error(err.error || "Something went wrong");
            });
          }
          return res.json();
        })
        .then((data) => {
          if (data.message === "success") {
            alert("User registered successfully");
            router.replace("/api/auth/signin");
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
          alert("An error occurred: " + error.message);
        });
    } else {
      alert("Please fill all the fields");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-white text-2xl py-4">Register</h1>
      <div className="flex flex-col gap-y-4">
        <div>
          <label htmlFor="" className="text-white">
            Full Name:
          </label>
          <input
            type="text"
            name="fullname"
            pattern="[A-Za-z ]{3,}"
            title="Username must contain atleast three characters"
          />
        </div>
        <div>
          <label htmlFor="" className="text-white">
            Username:
          </label>
          <input
            type="text"
            name="username"
            pattern=".{3,}"
            title="Username must contain atleast three characters"
          />
        </div>
        <div>
          <label htmlFor="" className="text-white">
            Password:
          </label>
          <input
            type="password"
            name="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          />
        </div>
        <div>
          <label htmlFor="" className="text-white">
            Role:
          </label>
          <select name="role" id="" defaultValue={role}>
            <option value="student" selected={role === "student"}>
              Student
            </option>
            <option value="company" selected={role === "company"}>
              Company
            </option>
            <option value="college" selected={role === "college"}>
              College
            </option>
          </select>
        </div>
      </div>

      <button type="submit" className="text-white p-1 bg-blue-400 my-2">
        Register
      </button>
    </form>
  );
};

export default Form;
