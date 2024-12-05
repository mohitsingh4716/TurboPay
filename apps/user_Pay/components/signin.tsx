"use client";
export const SigninComponent = () => {
  return (
    <div>
      <h1 className="text-3xl text-white">Signin</h1>
      <form>
        <input type="text" placeholder="Phone number" />
        <input type="password" placeholder="Password" />
        <button>Signin</button>
      </form>
    </div>
  );
};
