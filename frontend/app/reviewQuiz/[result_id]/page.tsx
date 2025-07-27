// app/reviewQuiz/[result_id]/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ReviewAnswers from "@/components/Review";

export default async function ReviewPage({ params }: { params: { result_id: string } }) {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  // if (!access) {
  //   redirect("/auth/login");
  // }

  const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}reviewAnswers/${params.result_id}`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
    cache: "no-store",
  });

  // if (!response.ok) {
  //   redirect("/auth/login");
  // }

  const data = await response.json();

  return (
    <section>
      <ReviewAnswers ReviewData={data} />
    </section>
  );
}
