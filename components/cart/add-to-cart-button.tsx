"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart, Check } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

interface AddToCartButtonProps {
  course: {
    id: number
    title: string
    instructor: string
    price: number
    image: string
    category: string
  }
}

export function AddToCartButton({ course }: AddToCartButtonProps) {
  const { addItem, isInCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    if (isInCart(course.id)) {
      toast({
        title: "Already in Cart",
        description: "This course is already in your cart.",
        variant: "destructive",
      })
      return
    }

    addItem(course)

    toast({
      title: "Added to Cart",
      description: `${course.title} has been added to your cart.`,
    })
  }

  return (
    <Button className="w-full" size="lg" onClick={handleAddToCart} disabled={isInCart(course.id)}>
      {isInCart(course.id) ? (
        <>
          <Check className="mr-2 h-5 w-5" />
          In Cart
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </>
      )}
    </Button>
  )
}
