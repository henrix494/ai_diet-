import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-screen flex justify-center h-[80vh] items-center">
      <SignUp forceRedirectUrl={"/dashboard"} />
    </div>
  );
}
