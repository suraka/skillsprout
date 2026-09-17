import sample from '@/data/courses.json';
export type Lesson={id:string;title:string;estimated_minutes:number;lesson_type:string;content:{blocks:{type:string;text:string}[]}};
export type Course={id:string;slug:string;title:string;category:string;age_band:string;short_description:string;description:string;difficulty:string;is_free:boolean;status:string;color?:string;icon?:string;lessons:Lesson[]};
export type Student={id:string;first_name:string;age_band:string};
export type Enrollment={id:string;student_id:string;course_id:string;status:string;progress_percent?:number};
export const sampleCourses=sample as Course[];
export type Config={apiUrl:string;firebaseApiKey:string};
let token='',refreshToken='',expiresAt=0;
export function signOut(){token='';refreshToken='';expiresAt=0;}
export async function signIn(config:Config,email:string,password:string,signup:boolean){
 const r=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${signup?'signUp':'signInWithPassword'}?key=${encodeURIComponent(config.firebaseApiKey)}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password,returnSecureToken:true})});
 const d=await r.json() as {error?:{message?:string};idToken:string;refreshToken:string;expiresIn:string}; if(!r.ok)throw Error(d.error?.message==='EMAIL_EXISTS'?'An account with this email already exists.':'Could not sign in. Check your email and password.');token=d.idToken;refreshToken=d.refreshToken;expiresAt=Date.now()+Number(d.expiresIn)*1000;
}
export async function request<T>(config:Config,path:string,options:RequestInit={}):Promise<T>{
 if(token&&Date.now()>expiresAt-60000){const r=await fetch(`https://securetoken.googleapis.com/v1/token?key=${encodeURIComponent(config.firebaseApiKey)}`,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'refresh_token',refresh_token:refreshToken})});const d=await r.json() as {id_token:string;refresh_token:string;expires_in:string};if(!r.ok){signOut();throw Error('Please sign in again.');}token=d.id_token;refreshToken=d.refresh_token;expiresAt=Date.now()+Number(d.expires_in)*1000;}
 const r=await fetch(`${config.apiUrl}/api/v1${path}`,{...options,headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`} :{}),...options.headers}});const d=await r.json() as T & {detail?:unknown};if(!r.ok)throw Error(typeof d.detail==='string'?d.detail:'We could not save that. Please check your entries.');return d;
}
