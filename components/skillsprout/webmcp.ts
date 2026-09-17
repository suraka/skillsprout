'use client';
import {useEffect} from 'react';
import type {Course} from '@/lib/academy';
type ModelContext={registerTool:(tool:{name:string;title:string;description:string;inputSchema:object;annotations:object;execute:(input:unknown)=>unknown},options:{signal:AbortSignal})=>void|Promise<void>};
export function useCatalogTools(courses:Course[]){useEffect(()=>{
 const context=(document as Document & {modelContext?:ModelContext}).modelContext;
 if(!context?.registerTool)return;
 const lifecycle=new AbortController();
 try{void Promise.resolve(context.registerTool({name:'search_courses',title:'Search SkillSprout courses',description:'Read the available course catalog and return matching adventures. Does not enroll a learner.',inputSchema:{type:'object',properties:{query:{type:'string'}},required:['query'],additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:true},execute(input){if(!input||typeof input!=='object'||!('query' in input)||typeof input.query!=='string'||Object.keys(input).some(k=>k!=='query'))throw Error('Provide a query string only.');const q=input.query.toLowerCase();return courses.filter(c=>`${c.title} ${c.category} ${c.short_description}`.toLowerCase().includes(q)).map(c=>({title:c.title,age_band:c.age_band,path:`/courses/${c.slug}`,lessons:c.lessons.length}));}},{signal:lifecycle.signal})).catch(()=>{});}catch{/* Unsupported browsers retain the normal interface. */}
 return()=>lifecycle.abort();
},[courses]);}
