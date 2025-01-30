// /app/blog/[id]/page.tsx

import React from 'react'

interface Props {
  params: {
    id: string; // the dynamic parameter from the URL
  };
}

const Page = ({ params }: Props) => {
  return <div>Blog Post ID: {params.id}</div>;
}

export default Page;
