export default function CheckoutBanner() {
  const h2Styles = "text-white font-semibold text-lg"
  return (
    <div className="bg-jade p-5">
      <div className="flex justify-between">
        <h2 className={h2Styles}>Movie: Encanto</h2>
        <h2 className={h2Styles}>Time: 12:00 PM</h2>
      </div>
      <h2 className={h2Styles}>Location: University 16 Cinema</h2>
      <h2 className={h2Styles}>Date: Thursday, February 22, 2024</h2>
    </div>
  )
}
