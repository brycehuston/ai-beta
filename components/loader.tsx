import Image from "next/image";

export const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-10 h-10 relative animate-spin">
        <Image
          alt="logo"
          src="/logo.png"
          width={40}  // Assuming a width of 40, adjust as necessary
          height={40}  // Assuming a height of 40, adjust as necessary
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Genius is thinking ...
      </p>
    </div>
  );
};
