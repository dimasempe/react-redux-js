import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

function CounterPage() {
  const counterSlice = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const [input, setInput] = useState(0);

  const incrementCounter = () => {
    dispatch({ type: "counter/increment" });
  };

  const decrementCounter = () => {
    dispatch({ type: "counter/decrement" });
  };

  const fillCounter = () => {
    dispatch({ type: "counter/fill_counter", payload: input });
  };
  return (
    <div className="min-h-screen">
      <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-md space-y-6">
        {/* Counter */}
        <div className="flex items-center justify-between">
          <Button onClick={decrementCounter}>-</Button>
          <span className="text-2xl font-bold">{counterSlice.counter}</span>
          <Button onClick={incrementCounter}>+</Button>
        </div>

        {/* Divider */}
        <hr />

        {/* Input + Button */}
        <div className="flex gap-4">
          <Input
            onChange={(e) => setInput(Number(e.target.value))}
            type="number"
            placeholder="Type something..."
          />
          <Button onClick={fillCounter}>Click</Button>
        </div>
      </div>
    </div>
  );
}

export default CounterPage;
