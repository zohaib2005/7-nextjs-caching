import Messages from "@/components/messages";
import { unstable_noStore } from "next/cache";

// it will refetch data after every 5 seconds;
export const revalidate = 5;

// revalidate and dynamic are file wide cache management tools
// it will always refresh every fetch request , no data is cached
// export const dynamic = "force-dynamic";
// is similar to { cache: 'no-store' }

export default async function MessagesPage() {
  // its similar to dymanic which disable cache but its function wide
  unstable_noStore();
  const response = await fetch("http://localhost:8080/messages", {
    // next: { revalidate: 5},
    headers: {
      "X-ID": "page",
    },
  });
  const messages = await response.json();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}
