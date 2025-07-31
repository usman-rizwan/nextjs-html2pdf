import { redirect } from 'next/navigation';

export default function Home() {
  console.log('process' , process.env.NODE_ENV);
  
  redirect('/html-to-pdf');
}
