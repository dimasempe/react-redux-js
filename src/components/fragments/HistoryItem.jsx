import AuthedPage from "../guard/AuthedPage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { format } from "date-fns";

export const HistoryItem = ({ transaction }) => {
  return (
    <AuthedPage>
      <div>
        <div className="rounded-md p-4 bg-slate-50 flex justify-between items-center">
          <div className="flex flex-col justify-center">
            <span className="text-muted-foreground text-sm">
              {format(new Date(transaction.transactionDate), "dd MMMM yyyy HH:mm:ss")}
              
            </span>
            <span className="text-muted-foreground font-semibold">
              INV-{transaction.id}
            </span>
          </div>
          <div className="flex flex-col justify-center items-end">
            <span>
              Rp{" "}
              {(transaction.totalPrice + transaction.tax).toLocaleString(
                "id-ID",
              )}
            </span>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead colSpan={2}>Product</TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead className="text-center">Total Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transaction.items.map((historyItem) => (
              <TableRow key ={historyItem.id} className="text-muted-foreground font-semibold">
                <>
                  <TableCell colSpan={2} className="font-medium">
                    <div className="flex items-center gap-6">
                      <div className="aspect-square w-[100px] overflow-hidden rounded-md">
                        <img
                          src={historyItem.product.imageUrl}
                          alt={historyItem.product.imageUrl}
                        />
                      </div>
                      <p className="font-semibold text-primary">{historyItem.product.name}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    Rp {historyItem.product.price.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="text-right">
                    {historyItem.quantity}
                  </TableCell>
                  <TableCell className="text-right">
                    Rp{" "}
                    {(
                      historyItem.product.price * historyItem.quantity
                    ).toLocaleString("id-ID")}
                  </TableCell>
                </>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AuthedPage>
  );
};
