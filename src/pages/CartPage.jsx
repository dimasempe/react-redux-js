import AuthedPage from "@/components/guard/AuthedPage";

function CartPage() {
  return (
    <AuthedPage>
      <div>
        <h1>Cart Page</h1>
      </div>
    </AuthedPage>
  );
}

export default CartPage;
