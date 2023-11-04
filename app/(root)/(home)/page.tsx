import { UserButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <div>
      dds
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}
