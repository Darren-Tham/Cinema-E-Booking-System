export default function Admin() {
  const buttonStyles =
    "mt-6 text-black w-max font-bold px-4 py-2 rounded-md hover:scale-105 transition-transform duration-300 mt-2 bg-light-jade  min-w-[200px] min-h-[50px]"
  const h1Styles = "font-bold text-xl text-white text-center"

  return (
    <div className="h-screen bg-dark-jade flex justify-center items-center">
      <div className="bg-teal-950 p-16 rounded-lg flex flex-col gap-4 items-center">
        <h1 className={h1Styles}>Admin</h1>
        <button className={buttonStyles}>Manage Movies</button>
        <button className={buttonStyles}>Manage Users</button>
        <button className={buttonStyles}>Manage Promotions</button>
      </div>
    </div>
  )
}
