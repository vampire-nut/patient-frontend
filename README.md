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


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

## Project Structure
├── public/
│   └── favicon.ico
├── shared/
│   └── types.ts                 // Interfaces for patient data and WebSocket messages
├── utils/
│   └── socket.ts                // WebSocket client initialization and connection
├── pages/
│   ├── patient-from/                     
│   │   └── index.tsx             // Patient-From page
│   ├── staff/                     
│   │   └── index.tsx             // Staff page
│   ├── _app.tsx                 
│   ├── _document.tsx            
│   ├── index.tsx                
├── styles/
│   ├── globals.css          
├── src/
│   ├── components/    
│   │   └── LoadingSpinner.tsx  
│   │   └── SuccessDialog.tsx   
├── server.js                    // Custom Node.js server for integrating Socket.IO
├── .env.local                   
├── .gitignore                  
├── next-env.d.ts                
├── next.config.js             
├── postcss.config.mjs        
├── package.json               
├── README.md                    // Project description
├── tsconfig.json                
└── yarn.lock                    

