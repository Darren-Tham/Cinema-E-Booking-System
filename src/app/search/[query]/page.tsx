type Props = {
  params: {
    query: string
  }
}

export default function SearchQuery({ params: { query } }: Readonly<Props>) {
  return <div>{query}</div>
  
}
