import {CoursePage} from '@/components/skillsprout/site';
export default async function Page({params}:{params:Promise<{slug:string}>}){return <CoursePage slug={(await params).slug}/>;}
