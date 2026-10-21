import { PriorityQueue } from './queue.js';
const $ = id => document.getElementById(id);
const names = ['', 'TT&C', 'SSTV', 'Codec2', 'M17'];
let queue = new PriorityQueue(), sent = [], totalSent = 0;
function render(message) {
  $('pending').innerHTML = `${queue.items.length} <small>/ 8 slots</small>`;
  $('sentCount').innerHTML = `${totalSent} <small>this session</small>`;
  $('next').innerHTML = queue.items.length ? `${names[queue.items[0].mode]} <small>P${queue.items[0].priority} · #${String(queue.items[0].id).padStart(3,'0')}</small>` : '— <small>queue empty</small>';
  $('queueCount').textContent = queue.items.length;
  $('queue').innerHTML = Array.from({length:8},(_,i) => {
    const p=queue.items[i];
    return p ? `<div class="packet"><div class="packet-top"><span class="packet-id">#${String(p.id).padStart(3,'0')}</span><em class="p${p.priority}">P${p.priority}</em></div><b>${names[p.mode]}</b><small>${i===0?'NEXT TO TRANSMIT':`ARRAY INDEX ${i}`}</small></div>` : `<div class="empty-slot">SLOT ${i} / EMPTY</div>`;
  }).join('');
  $('add').disabled = queue.items.length === 8;
  $('add').textContent = queue.items.length === 8 ? 'Queue full · transmit a packet' : '＋ Add to queue';
  $('transmit').disabled = !queue.items.length;
  $('queueNote').textContent = queue.items.length ? 'Sorted by priority. Equal priorities keep their arrival order.' : 'Queue empty. Add a packet or load the example.';
  $('log').innerHTML = sent.length ? sent.map((p,i)=>`<div class="log-row"><em class="p${p.priority}">P${p.priority}</em><b>#${String(p.id).padStart(3,'0')} · ${names[p.mode]}</b><span>Delivered to Ground</span><span>TX ${totalSent-i}</span></div>`).join('') : '<div class="empty-log">No transmissions yet. Your downlink history will appear here.</div>';
  if(message) $('feedback').textContent = message;
}
$('packetForm').addEventListener('submit', e=>{
  e.preventDefault();
  const p = queue.enqueue(Number(new FormData(e.target).get('mode')));
  render(p ? `Packet #${String(p.id).padStart(3,'0')} added. ${names[p.mode]} has priority ${p.priority}${p.priority===3?'; voice packets keep their arrival order.':'.'}` : 'Queue full. Transmit a packet before adding another.');
});
document.querySelectorAll('input[name="mode"]').forEach(input=>input.addEventListener('change',()=>document.querySelectorAll('.mode').forEach(label=>label.classList.toggle('selected',label.querySelector('input').checked))));
$('transmit').addEventListener('click',()=>{
  const p=queue.dequeue();
  if(!p)return;
  totalSent++;sent.unshift(p);sent=sent.slice(0,5);
  render(`Transmitted #${String(p.id).padStart(3,'0')} (${names[p.mode]}). Removed index 0 and shifted the remaining packets left.`);
});
$('demo').addEventListener('click',()=>{
  queue=new PriorityQueue();sent=[];totalSent=0;
  [4,2,1,3,1].forEach(mode=>queue.enqueue(mode));
  render('Example loaded; session restarted. Arrival: M17 → SSTV → TT&C → Codec2 → TT&C. Notice how P1 moves to the front.');
});
$('reset').addEventListener('click',()=>{queue=new PriorityQueue();sent=[];totalSent=0;render('Session reset. The queue and transmission log are empty.');});
function showTheory(value){
  $('lab').hidden=value;$('theory').hidden=!value;
  $('labTab').classList.toggle('active',!value);$('theoryTab').classList.toggle('active',value);
  $('labTab').setAttribute('aria-pressed',String(!value));$('theoryTab').setAttribute('aria-pressed',String(value));
}
$('labTab').addEventListener('click',()=>showTheory(false));
$('theoryTab').addEventListener('click',()=>showTheory(true));
[4,2,1,3].forEach(mode=>queue.enqueue(mode));
render('Four sample packets are ready. TT&C was added third but will transmit first.');
