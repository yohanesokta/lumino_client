import { useAuth } from "@/hooks/useAuth"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import useProduct from "@/hooks/useProduct"

const ProfilePage = () => {
  const { user, logout } = useAuth()

  const { orders } = useProduct()

  return (
    <section className="min-h-screen px-4 py-20 bg-gradient-to-br from-white via-indigo-50 to-purple-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Profile Card */}
        <Card className="bg-background">
          <CardContent className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-14 h-14">
                <AvatarFallback className="bg-primary text-white text-xl font-semibold">
                  {user?.name?.[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl font-bold">{user?.name}</CardTitle>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <Button variant="destructive" onClick={logout}>
              Logout
            </Button>
          </CardContent>
        </Card>

        {/* Order History */}
        <Card className="bg-background">
          <CardHeader>
            <CardTitle className="text-lg font-bold">🧾 Order History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {orders.length === 0 ? <div className="flex flex-col items-center gap-4">
              <p className="text-muted-foreground">You haven't made any orders yet.</p>
              <Button asChild><Link to="/products">Shop Now</Link></Button>
            </div> : orders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col md:flex-row md:justify-between md:items-center border rounded-lg p-4 gap-2"
              >
                <div>
                  <p className="font-semibold">{order.product.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(order.updateAt, "dd MMM yyyy")} &bull; {order.id}
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-2 md:mt-0">
                  <Badge
                    variant={
                      order.status === "success"
                        ? "default"
                        : order.status === "pending"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {order.status}
                  </Badge>
{/* 
                  {order.status === "success" && order.downloadUrl && (
                    <a
                      href={order.downloadUrl}
                      download
                      className="text-sm text-primary underline hover:text-primary/80"
                    >
                      Download
                    </a>
                  )} */}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default ProfilePage