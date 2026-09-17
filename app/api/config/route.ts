export const dynamic = 'force-dynamic';
export async function GET(){return Response.json({apiUrl:process.env.SKILLSPROUT_API_URL||'',firebaseApiKey:process.env.FIREBASE_WEB_API_KEY||''});}
