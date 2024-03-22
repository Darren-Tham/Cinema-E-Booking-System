import Link from "next/link";

export default function OrderConfirmation() {
  const h1Styles = "font-bold text-5xl text-white text-center";
  const h1Styles2 = "text-1xl text-white  font-semibold";
  const h1Styles3 = "font-bold text-5xl text-white text-center";
  const buttonStyles =
    "text-white w-max font-bold px-4 py-2 rounded-md hover:scale-105 transition-transform duration-300 mt-2 bg-dark-jade  min-w-[200px] min-h-[50px]";

  return (
    <div className="h-screen bg-black">
      <div className="bg-dark-jade flex flex-col gap-4 p-12">
        <h1 className={h1Styles}>Thank you for your order!</h1>
      </div>

      <div className="flex justify-center">
        <div className="bg-dark-jade pt-12 px-12 pb-10 rounded-lg flex flex-col gap-4 items-start mt-2">
          <h1 className={h1Styles3}>Order Details</h1>
          <div>
            <h1 className={h1Styles2}>Order Confirmation Number: 62P-452QR8</h1>
            <p className={h1Styles2}>Date: Thursday, Febuary 22, 2024</p>
            <p className={h1Styles2}>Location: University 16 Cinema</p>
            <p className={h1Styles2}>Time: 12:00pm</p>
          </div>

          <div className="w-full border-t border-gray my-6"></div>
          <div>
            <p className={h1Styles2}>Adult Ticket x 2</p>
            <p className={h1Styles2}>Child Ticket x 1</p>
            <p className={h1Styles2}>Promotion Discount: $0.00</p>
            <p className={h1Styles2}>Total: $37.99</p>
          </div>
        </div>
      </div>
      <Link href="/" className="flex justify-center mt-4">
        <button className={buttonStyles}>Continue to Home</button>
      </Link>
    </div>
  );
}
