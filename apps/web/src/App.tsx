import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Button } from "@habitctrl/ui/components/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex justify-center items-center gap-8 mb-8">
        <a href="https://vite.dev" target="_blank" className="hover:opacity-80 transition-opacity">
          <img src={viteLogo} className="h-24 w-24 animate-pulse" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" className="hover:opacity-80 transition-opacity">
          <img src={reactLogo} className="h-24 w-24 animate-spin-slow" alt="React logo" />
        </a>
      </div>
      <h1 className="text-4xl font-bold mb-6 text-center text-primary !font-manrope">Vite + React</h1>
      <div className="p-6 bg-card rounded-lg shadow-md max-w-md mx-auto mb-8">
        <Button
          onClick={() => setCount((count) => count + 1)}
          className="w-full mb-4"
        >
          count is {count}
        </Button>
        <p className="text-sm text-muted-foreground text-center">
          Edit <code className="bg-muted px-1.5 py-0.5 rounded text-xs">src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-center text-sm text-muted-foreground mt-8">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
