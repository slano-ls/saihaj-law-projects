import { WorkList } from "@/components/dom/WorkList";

export default function Page() {
  return <WorkList />;
}

export async function getStaticProps() {
  return { props: { title: "My Work | Saihaj Law - Student Developer" } };
}
