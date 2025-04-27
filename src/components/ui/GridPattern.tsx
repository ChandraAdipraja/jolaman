import { cn } from "../../lib/utils";

export function GridBackground() {
  return (
    <div className="fixed inset-0 -z-50 h-full w-full">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#0000001a_1px,transparent_1px),linear-gradient(to_bottom,#0000001a_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)]",
          "[mask-image:radial-gradient(circle_at_center,black_30%,rgba(0,0,0,0.8)_60%,transparent_80%)]",
          "mask-repeat-no-repeat mask-size-cover"
        )}
      />
    </div>
  );
}
