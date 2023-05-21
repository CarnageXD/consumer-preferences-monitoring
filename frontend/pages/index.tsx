import Image from "next/image";
import { Nunito } from "next/font/google";
import { Button } from "@material-tailwind/react";

const nunito = Nunito({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="text-primary-crimson">
      <Button>Hello</Button>
    </div>
  );
}
