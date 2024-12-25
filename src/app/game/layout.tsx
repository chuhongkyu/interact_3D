import Loading from "@/app/components/view/game/Loading"

export default function GameLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        <Loading/>
        {children}
      </section>
    )
  }