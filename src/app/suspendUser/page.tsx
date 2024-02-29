import AccountField from "@/components/AccountField"

export default function suspendUser() {
  return (
    <div className="flex flex-col bg-black h-screen items-center justify-center">
      <div className="flex flex-col  p-10 bg-dark-jade items-center rounded space-y-4">
        <div className="flex items-center gap-3">
          <label htmlFor="search" className="text-white font-semibold text-lg">
            Search User
          </label>
          <input id="search" className="input w-max" />
        </div>
        <AccountField email="firstname12345@gmail.com" />
        <AccountField email="firstname12345@gmail.com" />
        <AccountField email="firstname12345@gmail.com" />
        <AccountField email="firstname12345@gmail.com" />
        <AccountField email="firstname12345@gmail.com" />
        <AccountField email="firstname12345@gmail.com" />
        <AccountField email="firstname12345@gmail.com" />
        <AccountField email="firstname12345@gmail.com" />
        <AccountField email="firstname12345@gmail.com" />
        <AccountField email="firstname12345@gmail.com" />
        <AccountField email="firstname12345@gmail.com" />
      </div>
    </div>
  )
}
