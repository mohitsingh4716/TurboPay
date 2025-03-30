import Link from "next/link";
import { Button } from "./button";
import Image from "next/image";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  // TODO: can u figure out what the type should be here?
  onSignin: any;
  onSignout: any;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  return (
    <div className="flex justify-between border-b px-4 backdrop-blur-md shadow-md z-50 p-1">
      <nav className="text-lg flex flex-col justify-center">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="TurboPay Logo"
            width={200}
            height={60}
            priority
          />
        </Link>
      </nav>
      <div className="flex flex-col justify-center pt-2">
        <Button onClick={user ? onSignout : onSignin}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};
