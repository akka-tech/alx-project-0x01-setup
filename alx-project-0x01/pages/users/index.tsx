import React from 'react'
import UserCard from '@/components/common/UserCard'
import { UserProps } from '@/interfaces'

interface Props {
  posts: UserProps[] | null
  error?: string
}

export const getStaticProps = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users")

    if (!response.ok) {
      throw new Error(`Fetch error: ${response.statusText}`)
    }

    const data = await response.json()

    // Validate data is an array
    if (!Array.isArray(data)) {
      throw new Error('Invalid data format: expected an array')
    }

    return {
      props: {
        posts: data
      }
    }
  } catch (error: any) {
    return {
      props: {
        posts: null,
        error: error.message
      }
    }
  }
}

export default function IndexPage({ posts, error }: Props) {
  if (error) {
    return <div className="text-red-600 font-semibold">Error: {error}</div>
  }

  if (!posts) {
    return <div className="text-gray-500">No user data available.</div>
  }

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
