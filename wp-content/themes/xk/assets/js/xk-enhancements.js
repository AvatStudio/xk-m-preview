/* Новая страница «Уборка офисов» (дизайн: пакет home-cleaning-developer-handoff, 07.11.2026).
   Картинки лежат в ../office/ рядом с папкой js — адрес считаем от самого скрипта,
   чтобы работало и на боевом домене, и на превью в подпапке. */
const xkOfficeBase=document.currentScript?new URL('../office/',document.currentScript.src).href:'/wp-content/themes/xk/assets/office/';
(()=>{const zones=[
{title:'Рабочие места',image:'hero',items:['Удаление пыли с доступных поверхностей','Очистка столов и внешних поверхностей мебели','Сухая и влажная уборка пола','Опустошение корзин и замена пакетов'],note:'Работу с оргтехникой, документами и личными вещами согласуем отдельно.'},
{title:'Переговорные',image:'meeting',items:['Очистка стола и доступных поверхностей мебели','Удаление следов с дверей и ручек','Уборка пола и доступных участков под мебелью','Мойка стеклянных перегородок по согласованию'],note:'Подбираем время уборки с учётом расписания встреч. Работы со стеклянными поверхностями уточняем в перечне.'},
{title:'Кухня и кофе-пойнты',image:'kitchen',items:['Очистка столешниц и обеденных столов','Мытьё раковины и смесителя','Протирка фасадов и внешних поверхностей техники','Уборка пола, вынос мусора и замена пакетов'],note:'Мытьё посуды, очистка холодильника внутри и обслуживание кофемашины — по отдельному согласованию.'},
{title:'Санузлы',image:'washroom',items:['Очистка сантехники и смесителей','Обработка контактных поверхностей','Мытьё зеркал и пола','Пополнение расходных материалов по согласованному перечню'],note:'Периодичность уборки и поставку расходных материалов определяем с учётом посещаемости и условий договора.'},
{title:'Полы и входная группа',image:'floor',items:['Удаление пыли, песка и уличных загрязнений','Очистка входных дверей и контактных поверхностей','Сухая и влажная уборка напольного покрытия','Машинная уборка подходящих покрытий'],note:'Уход за грязезащитными коврами и интенсивность уборки в непогоду согласуем дополнительно.'}];
const buttons=[...document.querySelectorAll('.xk-office-tabs button')];
function select(i,focus=false){const z=zones[i];buttons.forEach((b,j)=>{b.setAttribute('aria-selected',i===j);b.tabIndex=i===j?0:-1;if(focus&&i===j)b.focus()});document.querySelector('#xk-zone-panel').setAttribute('aria-labelledby','xk-zone-'+i);const img=document.querySelector('#xk-zone-image');img.src=window.xkEmbeddedImages?window.xkEmbeddedImages[z.image]:xkOfficeBase+z.image+'-natural.webp';img.alt='Иллюстрация уборки: '+z.title.toLowerCase();document.querySelector('#xk-zone-title').textContent=z.title;document.querySelector('#xk-zone-list').replaceChildren(...z.items.map(t=>{const e=document.createElement('li');e.textContent=t;return e}));document.querySelector('#xk-zone-note').textContent=z.note;window.dispatchEvent(new CustomEvent('xk:zone',{detail:i}))}
buttons.forEach((b,i)=>{b.addEventListener('click',()=>select(i));b.addEventListener('keydown',e=>{let n=i;if(e.key==='ArrowRight')n=(i+1)%5;else if(e.key==='ArrowLeft')n=(i+4)%5;else if(e.key==='Home')n=0;else if(e.key==='End')n=4;else return;e.preventDefault();select(n,true)})});
})();
(()=>{
const area=document.querySelector('#xk-area'), slider=document.querySelector('#xk-area-slider');
if(!area)return;
const types=[...document.querySelectorAll('input[name="cleaning"]')];
const names=['Регулярная уборка','Генеральная уборка','Уборка после ремонта'];
const descriptions=['Для поддержания чистоты по согласованному графику.','Для тщательной уборки и удаления накопившихся загрязнений.','Для подготовки офиса к работе после ремонтных работ.'];
// Same area brackets and starting prices as the existing page table.
const tiers=[[50,3300,7200,8900],[100,5600,7900,9600],[150,6700,12700,16300],[200,7800,12800,17900],[300,8600,15000,19500]];
function update(){
 const a=area.valueAsNumber,t=Number(types.find(r=>r.checked).value);
 const valid=Number.isInteger(a)&&a>=1&&a<=10000;
 area.setAttribute('aria-invalid',String(!valid));document.querySelector('#xk-area-error').hidden=valid;
 document.querySelector('.xk-calc-contact button').disabled=!valid;
 document.querySelector('#xk-calc-description').textContent=descriptions[t];
 const price=document.querySelector('#xk-calc-price'),summary=document.querySelector('#xk-calc-summary');
 if(!valid){price.textContent='Укажите площадь';summary.textContent=names[t];return}
 slider.value=String(Math.min(a,1000));slider.setAttribute('aria-valuetext',a>1000?'Площадь '+a+' м² задана в поле ввода':a+' м²');
 const tier=tiers.find(row=>a<=row[0]);
 price.textContent=tier?'от '+new Intl.NumberFormat('ru-RU').format(tier[t+1])+' ₽':'Индивидуальный расчёт';
 summary.textContent=names[t]+' · '+new Intl.NumberFormat('ru-RU').format(a)+' м²';
}
area.addEventListener('input',update);slider.addEventListener('input',()=>{area.value=slider.value;update()});types.forEach(r=>r.addEventListener('change',update));update();
})();

(()=>{
const sets=[
[[75,78,'Стол и рабочие поверхности','Протираем доступные участки. Документы, технику и личные вещи обсуждаем отдельно.'],[60,39,'Стеклянные перегородки','Мойку стекла включаем в перечень по согласованию.'],[33,74,'Пол между рабочими местами','Убираем пыль и выполняем влажную уборку подходящим способом.']],
[[53,76,'Стол переговорной','Очищаем доступную столешницу и внешние поверхности мебели.'],[82,27,'Стекло и двери','Удаляем следы на согласованных участках, уделяем внимание ручкам.'],[92,83,'Зона вокруг мебели','Убираем пол и доступные участки под столом и креслами.']],
[[73,71,'Столешница','Удаляем загрязнения с рабочих поверхностей.'],[64,44,'Внешние поверхности техники','Протираем доступные поверхности; внутреннюю очистку согласуем отдельно.'],[80,89,'Фасады мебели','Очищаем внешние стороны шкафов с учётом материала.']],
[[43,73,'Раковина и смеситель','Очищаем сантехнику и контактные поверхности подходящими средствами.'],[32,28,'Зеркало','Удаляем следы и разводы на зеркальной поверхности.'],[66,87,'Столешница','Очищаем доступные участки вокруг раковины.']],
[[48,69,'Машинная уборка','Используем подходящие щётки и режим для конкретного покрытия.'],[84,32,'Входная группа','Уделяем внимание песку и загрязнениям с улицы.'],[76,83,'Открытые участки пола','Проверяем чистоту покрытия и отсутствие заметных разводов.']]
];let zone=0;
const buttons=[...document.querySelectorAll('.xk-hotspot')];
function select(i){buttons.forEach((b,j)=>b.setAttribute('aria-pressed',String(j===i)));const v=sets[zone][i];document.querySelector('#xk-hotspot-title').textContent=v[2];document.querySelector('#xk-hotspot-text').textContent=v[3]}
function change(i){zone=i;buttons.forEach((b,j)=>{const v=sets[i][j];b.style.left=v[0]+'%';b.style.top=v[1]+'%';b.setAttribute('aria-label',v[2])});select(0)}
buttons.forEach((b,i)=>b.addEventListener('click',()=>select(i)));window.addEventListener('xk:zone',e=>change(e.detail));change(0);
const checks=[...document.querySelectorAll('.xk-quality-items input')];
function update(){const n=checks.filter(c=>c.checked).length;const progress=document.querySelector('.xk-quality-progress');if(progress){progress.setAttribute('aria-valuenow',String(n));progress.querySelector('span').style.width=(n/checks.length*100)+'%';}document.querySelector('#xk-quality-count').textContent=n+' из '+checks.length;document.querySelector('#xk-quality-message').textContent=n===checks.length?'Все пункты примера отмечены.':n?'Отмечено '+n+' из '+checks.length+' пунктов.':'Каждый пункт — отдельная проверка.'}
checks.forEach(c=>c.addEventListener('change',update));document.querySelector('#xk-quality-reset').addEventListener('click',()=>{checks.forEach(c=>c.checked=false);update()});
})();

