import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs";


export default function Home() {
  return (
    <div>
      <SignedIn>
        <SignOutButton>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Sign Out
          </button>
        </SignOutButton>
      </SignedIn>

      <SignedOut>
        <SignInButton>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
    </div>
  );
}
