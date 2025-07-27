// pages/landing/index.tsx (or another appropriate route)
import React from 'react'
import UserCard from '@/components/common/UserCard'
import { UserProps } from '@/interfaces'

interface Props {
  posts: UserProps[]
}

export const getStaticProps = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users")
  const posts = await response.json()

  return {
    props: {
      posts
    }
  }
}

export default function IndexPage({ posts }: Props) {
  return (
    <div className="p-6 space-y-4">
      {posts.map(({ id, name, email, phone }) => (
        <div key={id} className="p-4 border rounded-md shadow-sm">
          <UserCard name={name} email={email} username={phone} id={id} />
        </div>
      ))}
    </div>
  )
}
