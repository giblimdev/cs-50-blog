import IsConnectedFake from "@/components/layout/header/IsConectedFake";
import NavHeaderFake from "@/components/layout/header/NaveHeaderFake";
import LogoFake from "@/components/layout/header/LogoFake";

export default function Header() {
  return (
    <header className=" p-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <LogoFake />
          <NavHeaderFake />
        </div>
        <IsConnectedFake />
      </div>
    </header>
  );
}
