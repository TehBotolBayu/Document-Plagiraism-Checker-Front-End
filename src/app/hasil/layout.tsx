import { ResProvider, useResContext } from "@/context/resContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <ResProvider>
            {children}
        </ResProvider>
  );
}
