export function GET() {
  return new Response(JSON.stringify({ name:'RAMUNI', short_name:'RAMUNI', start_url:'/', display:'standalone', background_color:'#F4F0E7', theme_color:'#0B3045', icons:[{src:'/icon-192.png',sizes:'192x192',type:'image/png'},{src:'/icon-512.png',sizes:'512x512',type:'image/png'}] }), { headers: { 'Content-Type':'application/manifest+json' } });
}
