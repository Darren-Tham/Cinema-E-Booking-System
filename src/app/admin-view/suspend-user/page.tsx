import AccountField from "@/components/accountField";

export default function suspendUser() {
  return (
    <div className="flex flex-col bg-black h-screen items-center justify-center">
      <div className="flex flex-col h-5/6 w-5/12 bg-dark-jade items-center rounded space-y-4">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,400,0,0"
        />
        <input
          className="bg-light-jade outline-none flex-grow placeholder:text-black pl-3"
          placeholder="Search"
        />
        <AccountField email="firstname12345@gmail.com" color="bg-light-jade" />
        <AccountField email="firstname12345@gmail.com" color="bg-light-jade" />
        <AccountField email="firstname12345@gmail.com" color="bg-light-jade" />
        <AccountField email="firstname12345@gmail.com" color="bg-light-jade" />
        <AccountField email="firstname12345@gmail.com" color="bg-light-jade" />
        <AccountField email="firstname12345@gmail.com" color="bg-light-jade" />
        <AccountField email="firstname12345@gmail.com" color="bg-light-jade" />
        <AccountField email="firstname12345@gmail.com" color="bg-light-jade" />
        <AccountField email="firstname12345@gmail.com" color="bg-light-jade" />
        <AccountField email="firstname12345@gmail.com" color="bg-light-jade" />
      </div>
    </div>
  );
}
