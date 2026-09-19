'use client';
import React,{createContext,useContext,useEffect,useState} from 'react';
import {Config,Course,Student,Enrollment,sampleCourses,request,signIn,signOut} from '@/lib/academy';
type User={display_name:string;role:string};
type State={config:Config|null;ready:boolean;demo:boolean;courses:Course[];students:Student[];enrollments:Enrollment[];user:User|null;error:string;setError:(s:string)=>void;login:(email:string,pw:string,signup:boolean)=>Promise<void>;logout:()=>void;addStudent:(name:string,age:string)=>Promise<void>;enroll:(student:string,course:string)=>Promise<Enrollment>;refresh:()=>Promise<void>;completed:Record<string,string[]>;complete:(e:Enrollment,l:string)=>Promise<void>;progress:(e:Enrollment)=>Promise<string[]>};
let previewId=0;
const nextPreviewId=()=>`preview-${++previewId}`;
const Context=createContext<State|null>(null);
export function AcademyProvider({children}:{children:React.ReactNode}){
 const [config,setConfig]=useState<Config|null>(null),[ready,setReady]=useState(false),[courses,setCourses]=useState<Course[]>([]),[students,setStudents]=useState<Student[]>([]),[enrollments,setEnrollments]=useState<Enrollment[]>([]),[user,setUser]=useState<User|null>(null),[error,setError]=useState(''),[completed,setCompleted]=useState<Record<string,string[]>>({});
 const demo=ready&&config!==null&&!config.apiUrl;
 useEffect(()=>{fetch('/api/config').then(r=>{if(!r.ok)throw Error('Configuration unavailable');return r.json() as Promise<Config>;}).then(async(c:Config)=>{setConfig(c);if(c.apiUrl){setCourses(await request<Course[]>(c,'/courses'));}else{setCourses(sampleCourses);setStudents([{id:'sample-learner',first_name:'Alex',age_band:'8-10'}]);}setReady(true);}).catch(()=>{setError('We could not connect. Please reload to try again.');setReady(true);});},[]);
 async function refresh(){if(!config?.apiUrl)return;setCourses(await request<Course[]>(config,'/courses'));const s=await request<Student[]>(config,'/students');setStudents(s);const es=await Promise.all(s.map(x=>request<Enrollment[]>(config,`/students/${x.id}/enrollments`)));setEnrollments(es.flat());}
 async function login(email:string,pw:string,signup:boolean){if(!config?.apiUrl||!config.firebaseApiKey)throw Error('Parent accounts are not connected yet. You can explore the sample lessons.');await signIn(config,email,pw,signup);setUser(await request<User>(config,'/me'));await refresh();}
 function logout(){signOut();setUser(null);setStudents([]);setEnrollments([]);setCompleted({});}
 async function addStudent(name:string,age:string){if(demo){setStudents(s=>[...s,{id:nextPreviewId(),first_name:name,age_band:age}]);return;}await request(config!,'/students',{method:'POST',body:JSON.stringify({first_name:name,age_band:age})});await refresh();}
 async function enroll(student:string,course:string){const existing=enrollments.find(e=>e.student_id===student&&e.course_id===course);if(existing)return existing;const e=demo?{id:nextPreviewId(),student_id:student,course_id:course,status:'active'}:await request<Enrollment>(config!,`/students/${student}/enrollments`,{method:'POST',body:JSON.stringify({course_id:course})});setEnrollments(es=>[...es,e]);return e;}
 async function progress(e:Enrollment){if(demo)return completed[e.id]||[];const p=await request<{lessons:{lesson_id:string;status:string}[]}>(config!,`/enrollments/${e.id}/progress`);const ids=p.lessons.filter(x=>x.status==='completed').map(x=>x.lesson_id);setCompleted(c=>({...c,[e.id]:ids}));return ids;}
 async function complete(e:Enrollment,l:string){if(!demo)await request(config!,`/enrollments/${e.id}/lessons/${l}/progress`,{method:'PUT',body:JSON.stringify({status:'completed',progress_percent:100})});setCompleted(c=>({...c,[e.id]:Array.from(new Set([...(c[e.id]||[]),l]))}));}
 return <Context.Provider value={{config,ready,demo,courses,students,enrollments,user,error,setError,login,logout,addStudent,enroll,refresh,completed,complete,progress}}>{children}</Context.Provider>;
}
export function useAcademy(){const c=useContext(Context);if(!c)throw Error('Missing AcademyProvider');return c;}
