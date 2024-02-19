# Running front & backend container with compose

1. Build front & backend images

   docker compose -f "docker-compose.yml" up -d --build

2. Stop and remove all containers

docker stop $(docker ps -a -q)

2. To delete unused/dangling processes when finished

   docker system prune -a --volumes

## Exposed Ports

frontend = 3000

backend = 8080

database = 3306

# Running the frontend container

1. Build the image

   docker build --pull --rm -f "frontend.dockerfile" -t cinemaebookingsystem:latest "."

2. Create and run container

   docker run -p 3000:3000 cinemaebookingsystem:latest

3. Client will be hosted at http://localhost:3000/

# Running the backend container

1. Build the image

   docker build --pull --rm -f "backend.dockerfile" -t cinemaebookingsystem:latest "."

2. Create and run container

   docker run -p 8080:8080 cinemaebookingsystem:latest

3. Server will be hosted at http://localhost:3000/

   Currently since there's no implementation, the container closes instantly after running. Might not work, will see once there's actual endpoints and implementation added.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
