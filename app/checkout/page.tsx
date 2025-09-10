import { CheckoutPage } from "@/components/checkout/checkout-page"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Checkout() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <CheckoutPage />
      </main>
      <Footer />
    </div>
  )
}
