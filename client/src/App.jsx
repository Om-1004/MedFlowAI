import { useSelector } from "react-redux"

export default function App() {
  const userName = useSelector((state) => state.user.currentUser)
  return (
    <h1 className="text-3xl font-bold underline">
      {userName}
    </h1>
  )
}