const addBtn = document.getElementById('submit')
const title = document.getElementById('input')
const content = document.getElementById('content')

const addNote = (note) => {
    const notes = JSON.parse(localStorage.getItem('notes')) || []
    notes.push(note)
    localStorage.setItem('notes', JSON.stringify(notes))
}

addBtn.addEventListener('click', () => {
    const note = {
        title: title.value,
        content: content.value
    }
    addNote(note)
    console.log(note)
})

const getNotes = () => {
    const notes = JSON.parse(localStorage.getItem('notes')) || []
    return notes
}

const renderNotes = () => {
    const notes = getNotes()
    const notesList = document.getElementById('notes')
    notesList.innerHTML = ''
    notes.forEach(item => {
        const note = document.createElement('div')
        note.innerHTML = `
            <h3>${item.title}</h3>
            <span></span>
            <p>${item.content}</p>
            <div class="icons">
                <i class="fa-sharp fa-solid fa-pen-to-square" id="edit"></i>
                <i class="fa-sharp fa-solid fa-trash remove" id="delete"></i>
            </div>
        `
        note.className = 'note'
        note.id = notes.indexOf(item)
        notesList.appendChild(note)
    })
}

const removeNote = (index) => {
    const notes = getNotes()
    notes.splice(index, 1)
    localStorage.setItem('notes', JSON.stringify(notes))
    renderNotes()
}

const removeAllNotes = () => {
    localStorage.clear()
    renderNotes()
}

if (localStorage.getItem('notes')) {
    renderNotes()
}

const removeBtn = document.getElementsByClassName('remove')
const removeAllBtn = document.getElementById('remove-all')

removeAllBtn.addEventListener('click', () => {
    removeAllNotes()
})

for (let i = 0; i < removeBtn.length; i++) {
    removeBtn[i].addEventListener('click', (e) => {
        const index = e.target.parentNode.parentNode.id
        removeNote(index)
    })
}

// const searchNotes = (searchText) => {
//     const notes = getNotes()
//     const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(searchText.toLowerCase()))
//     return filteredNotes
// }

// const searchBtn = document.getElementById('search')
// const searchInput = document.getElementById('search-input')

// searchBtn.addEventListener('click', () => {
//     const searchText = searchInput.value
//     const filteredNotes = searchNotes(searchText)
//     const notesList = document.getElementById('notes')
//     notesList.innerHTML = ''
//     filteredNotes.forEach(item => {
//         const note = document.createElement('div')
//         note.innerHTML = `
//             <h3>${item.title}</h3>
//             <span></span>
//             <p>${item.content}</p>
//         `
//         note.className = 'note'
//         notesList.appendChild(note)
//     })
// })