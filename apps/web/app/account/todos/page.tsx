
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);
  const { data: todos, error } = await supabase.from("todos").select("id,name").order("id");

  if (error) {
    return <p className="rounded-xl bg-rose-50 p-4 text-rose-700">Unable to load todos.</p>;
  }

  return (
    <ul className="space-y-2">
      {todos?.map((todo) => (
        <li className="rounded-xl border bg-white p-4" key={todo.id}>{todo.name}</li>
      ))}
    </ul>
  );
}
