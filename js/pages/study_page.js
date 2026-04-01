import { BOOK_LIBRARY } from "../../data/book/book_library.js"

let currentChapter = BOOK_LIBRARY.chapters[0]?.id || null
let currentSection = BOOK_LIBRARY.chapters[0]?.sections[0]?.title || null

function byId(id){ return BOOK_LIBRARY.chapters.find(ch => ch.id === id) }
function currentChapterObj(){ return byId(currentChapter) }
function currentSectionObj(){ return currentChapterObj()?.sections.find(sec => sec.title === currentSection) }
function escapeHtml(s){ return (s || "").replace(/[&<>\"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m])) }

function renderChapterList(){
  const wrap = document.querySelector('#chapterButtons')
  wrap.innerHTML = ''
  BOOK_LIBRARY.chapters.forEach(ch => {
    const btn = document.createElement('button')
    btn.className = 'chapter-btn' + (ch.id === currentChapter ? ' active' : '')
    const detailed = ch.sections.filter(s => s.source_status === 'book_text').length
    btn.innerHTML = `<span>${escapeHtml(ch.title)}</span><span class="small">${ch.sections.length} sections • ${detailed} text-loaded</span>`
    btn.addEventListener('click', () => {
      currentChapter = ch.id
      currentSection = ch.sections[0]?.title || null
      renderAll()
    })
    wrap.appendChild(btn)
  })
}

function renderSectionList(){
  const chapter = currentChapterObj()
  const search = document.querySelector('#studySearch').value.trim().toLowerCase()
  const wrap = document.querySelector('#sectionList')
  wrap.innerHTML = ''
  ;(chapter?.sections || []).forEach(sec => {
    const hay = `${sec.title} ${sec.summary} ${(sec.operator_focus || []).join(' ')} ${(sec.content_paragraphs || []).join(' ')}`.toLowerCase()
    if(search && !hay.includes(search)) return
    const btn = document.createElement('button')
    btn.className = 'section-btn' + (sec.title === currentSection ? ' active' : '')
    btn.innerHTML = `<span>${escapeHtml(sec.title)}</span><span class="small">${sec.source_status === 'book_text' ? 'book text loaded' : 'structured outline'}</span>`
    btn.addEventListener('click', () => { currentSection = sec.title; renderReader() })
    wrap.appendChild(btn)
  })
}

function renderReader(){
  const chapter = currentChapterObj()
  const sec = currentSectionObj()
  if(!chapter || !sec) return
  document.querySelector('#topicTitle').textContent = chapter.title
  document.querySelector('#topicSub').textContent = sec.title
  document.querySelector('#sectionMeta').innerHTML = `
    <span class="pill">${chapter.sections.length} sections in chapter</span>
    <span class="pill">${sec.source_status === 'book_text' ? 'direct book text loaded' : 'structured chapter outline loaded'}</span>
    <span class="pill">Category: ${chapter.category.replace(/_/g,' ')}</span>
  `

  document.querySelector('#readerBody').innerHTML = `
    <div class="study-block">
      <h3>Section Overview</h3>
      <p>${escapeHtml(sec.summary)}</p>
    </div>
    <div class="study-block">
      <h3>Operator Focus</h3>
      <ul class="clean">
        ${(sec.operator_focus || []).map(item => `<li>• ${escapeHtml(item)}</li>`).join('')}
      </ul>
    </div>
    <div class="study-block">
      <h3>Textbook Notes</h3>
      ${(sec.content_paragraphs || []).length
        ? sec.content_paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('')
        : `<p class="small">This section is scaffolded in textbook format and ready for additional source text as more OCR content is added to the zip.</p>`}
    </div>
  `

  const chapterPrompts = chapter.self_check_questions || []
  document.querySelector('#selfCheckBody').innerHTML = chapterPrompts
    .slice(0, 18)
    .map(q => `<div class="prompt-card">${escapeHtml(q)}</div>`)
    .join('')

  const acronymBody = document.querySelector('#acronymBody')
  const search = document.querySelector('#studySearch').value.trim().toLowerCase()
  acronymBody.innerHTML = ''
  BOOK_LIBRARY.acronyms
    .filter(a => !search || `${a.term} ${a.meaning} ${a.why_it_matters}`.toLowerCase().includes(search))
    .forEach(a => {
      const card = document.createElement('div')
      card.className = 'card third'
      card.innerHTML = `<h3>${escapeHtml(a.term)}</h3><div class="small"><b>${escapeHtml(a.meaning)}</b></div><div class="small">${escapeHtml(a.why_it_matters)}</div>`
      acronymBody.appendChild(card)
    })
}

function renderAll(){
  renderChapterList()
  renderSectionList()
  renderReader()
}

window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#studySearch').addEventListener('input', () => {
    renderSectionList()
    renderReader()
  })
  renderAll()
})
