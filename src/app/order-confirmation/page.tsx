export default function OrderConfirmation() {
  const h1Styles = "font-bold text-5xl text-white text-center"
  const h1Styles2 = "text-1xl text-white text-center"
  const h1Styles3 = "font-bold text-5xl text-white text-center underline"
  const buttonStyles =
    "text-white w-max font-bold px-4 py-2 rounded-md hover:scale-105 transition-transform duration-300 mt-2 bg-dark-jade  min-w-[200px] min-h-[50px] underline"
  const buttonStyles2 =
    "text-white w-max font-bold px-3 py-1 rounded-md hover:scale-105 transition-transform duration-300 mt-2 ml-5 bg-light-jade min-w-[150px] min-h-[40px]" // Adjusted padding and button size

  return (
    <div className="h-screen bg-light-jade">
      <div
        className="bg-dark-jade flex flex-col gap-4 items-center"
        style={{ padding: "4rem" }}
      >
        <h1 className={h1Styles}>Thank you for your order!</h1>
      </div>

      <div className="flex justify-center items-center">
        <div className="bg-dark-jade p-16 rounded-lg flex flex-col gap-4 items-center mt-2">
          <h1 className={h1Styles3}>Order Details</h1>
          <h1 className={h1Styles2}>Order Confirmation Number: 62P-452QR8</h1>
          <h1 className={h1Styles2}>Date: Thursday, Febuary 22, 2024</h1>
          <h1 className={h1Styles2}>Location: University 16 Cinemas</h1>
          <h1 className={h1Styles2}>Time 12:00pm</h1>

          <h1 className={h1Styles2}>Tickets Selected</h1>
          <ul className="list-disc pl-6 text-white">
            <li className="text-lg flex items-center justify-between">
              <span>Adult x2: $12.75</span>
              <button className={buttonStyles2}>Delete</button>
            </li>
            <li className="text-lg flex items-center justify-between">
              <span>Children&apos;s: $10.00</span>
              <button className={buttonStyles2}>Delete</button>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center mt-4 bg-light-jade">
        <button className={buttonStyles}>Continue to Checkout</button>
      </div>
    </div>
  )
}
