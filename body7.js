<script>
(function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var pin = document.getElementById('chas');
  var clk = document.getElementById('clk');
  var prog = document.getElementById('prog');
  var lead = document.getElementById('capLead');
  var note = document.getElementById('capNote');
  var dots = document.querySelectorAll('.st-dots i');
  var MIN = 95; // до 95 минут по скроллу, шкала с шагом 90
  var phases = [
    { at: 0,  lead: 'Завод выдал смесь — с этой минуты она работает сама.',
      note: 'Мы возим бетон самосвалом, а не миксером: смесь не перемешивается по дороге. Время считается с момента загрузки, а не с выезда из нашего двора.' },
    { at: 30, lead: 'Первые 30 минут: смесь подвижная, укладывайте сразу.',
      note: 'Если объект в Молодечно или рядом, этот запас реальный. Дальше каждый километр съедает подвижность, и работать с бетоном будет тяжелее.' },
    { at: 60, lead: 'Час прошёл: смесь густеет, окно закрывается.',
      note: 'На этом рубеже помогают добавки-замедлители, но их согласуют на заводе заранее — предупредите, если объект за городом.' },
    { at: 85, lead: 'Около 90 минут: край. Дальше смесь не уложить.',
      note: 'Точное время зависит от марки, температуры и добавок — цифру всегда подтверждает завод. Наша задача: не везти ваш бетон через полрайона.' }
  ];
  function pad(n){ return n < 10 ? '0' + n : '' + n; }
  function apply(p){
    var mins = p * MIN;
    clk.textContent = pad(Math.min(90, Math.floor(mins))) + ':' + pad(Math.round((mins % 1) * 60) % 60);
    prog.style.transform = 'scaleX(' + Math.min(1, mins / 90).toFixed(4) + ')';
    var idx = 0;
    for (var i = 0; i < phases.length; i++) if (mins >= phases[i].at) idx = i;
    if (lead.textContent !== phases[idx].lead) { lead.textContent = phases[idx].lead; note.textContent = phases[idx].note; }
    for (var j = 0; j < dots.length; j++) dots[j].classList.toggle('on', j <= idx);
  }
  if (reduce) { apply(1); return; }
  apply(0);
  var raf = false;
  function update(){
    raf = false;
    var r = pin.getBoundingClientRect();
    var span = r.height - innerHeight;
    var p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 1;
    apply(p);
  }
  addEventListener('scroll', function(){ if (!raf){ raf = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener('resize', update);
  update();
})();
</script>
</body>
</html>
